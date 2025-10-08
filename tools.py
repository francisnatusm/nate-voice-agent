import logging
from livekit.agents import function_tool, RunContext
import requests
from langchain_community.tools import DuckDuckGoSearchRun
import os
import smtplib
from email.mime.multipart import MIMEMultipart  
from email.mime.text import MIMEText
from typing import Optional
import subprocess
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO
from openai import OpenAI
import base64

# Optional: map friendly app names to their executable paths or commands
APP_MAP = {
    "chrome": r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "vlc": r"C:\Program Files\VideoLAN\VLC\vlc.exe",
    "notepad": "notepad",
    "calculator": "calc",
    "paint": "mspaint",
    # Add more apps as needed
}

# Load the .env file
load_dotenv()

# Debug: check if Gmail credentials are loaded correctly
#print("GMAIL_USER:", os.getenv("GMAIL_USER"))
#print("GMAIL_APP_PASSWORD:", os.getenv("GMAIL_APP_PASSWORD"))

def get_location_from_ip() -> str:
    """Get city name from IP using ipinfo.io"""
    try:
        resp = requests.get("https://ipinfo.io/json", timeout=5)
        if resp.status_code == 200:
            data = resp.json()
            return data.get("city", "Unknown")
    except Exception as e:
        logging.error(f"Failed to get location from IP: {e}")
    return "Unknown"

@function_tool()
async def get_weather(context: RunContext, city: str = None) -> str:
    """Get the current weather for a given city or current location if no city provided."""
    if not city:
        city = get_location_from_ip()
    try:
        response = requests.get(f"https://wttr.in/{city}?format=3", timeout=5)
        if response.status_code == 200:
            logging.info(f"Weather for {city}: {response.text.strip()}")
            return response.text.strip()
        else:
            return f"Could not retrieve weather for {city}."
    except Exception as e:
        return f"An error occurred while retrieving weather for {city}: {e}"


@function_tool()
async def get_time(context: RunContext, city: str = None) -> str:
    """Get the current local time for a given city or current location if no city provided."""
    if not city:
        city = get_location_from_ip()
    try:
        response = requests.get(f"https://wttr.in/{city}?format=%l:+%T", timeout=5)
        if response.status_code == 200:
            return response.text.strip()
        else:
            return f"Could not retrieve time for {city}."
    except Exception as e:
        return f"An error occurred while retrieving time for {city}: {e}"


@function_tool()
async def search_web(context: RunContext, query: str) -> str:
    """Search the web using DuckDuckGo."""
    try:
        results = DuckDuckGoSearchRun().run(tool_input=query)
        return results
    except Exception as e:
        return f"An error occurred while searching the web: {e}"    


@function_tool()    
async def send_email(
    context: RunContext,
    to_email: str,
    subject: str,
    message: str,
    cc_email: Optional[str] = None
) -> str:
    """Send an email through Gmail."""
    try:
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        
        gmail_user = os.getenv("GMAIL_USER")
        gmail_password = os.getenv("GMAIL_APP_PASSWORD")
        
        if not gmail_user or not gmail_password:
            return "Email sending failed: Gmail credentials not configured."
        
        msg = MIMEMultipart()
        msg['From'] = gmail_user
        msg['To'] = to_email
        msg['Subject'] = subject
        
        recipients = [to_email]
        if cc_email:
            msg['Cc'] = cc_email
            recipients.append(cc_email)
        
        msg.attach(MIMEText(message, 'plain'))
        
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(gmail_user, gmail_password)
        server.sendmail(gmail_user, recipients, msg.as_string())
        server.quit()
        
        return f"Email sent successfully to {to_email}"
    except Exception as e:
        return f"An error occurred while sending email: {str(e)}"


# Store opened processes
process_registry = {}

@function_tool()
async def open_app(context: RunContext, app_name: str) -> str:
    """Open an application by name or mapped path."""
    try:
        app_key = app_name.lower()
        app_path = APP_MAP.get(app_key)

        if not app_path:
            return f"I don't know how to open '{app_name}'."

        use_shell = "\\" not in app_path
        proc = subprocess.Popen(app_path if use_shell else [app_path], shell=use_shell)
        process_registry[app_key] = proc
        return f"Opening {app_name}..."
    except Exception as e:
        return f"Error opening {app_name}: {str(e)}"


@function_tool()
async def close_app(context: RunContext, app_name: str) -> str:
    """Close an app that was opened using `open_app`."""
    try:
        app_proc = process_registry.get(app_name.lower())
        if app_proc and app_proc.poll() is None:
            app_proc.terminate()
            app_proc.wait(timeout=5)
            return f"Closed {app_name}"
        else:
            return f"No running process found for '{app_name}'."
    except Exception as e:
        return f"Failed to close {app_name}: {str(e)}"


# ---------------- EXTRA FUNCTIONS FROM ELEVENLABS ----------------

@function_tool()
async def save_to_txt(context: RunContext, filename: str, data: str) -> str:
    """Save text data to a file."""
    try:
        with open(filename, "a", encoding="utf-8") as file:
            file.write(data + "\n")
        return f"Saved data to {filename}"
    except Exception as e:
        return f"Error saving to txt: {e}"


@function_tool()
async def create_html_file(context: RunContext, filename: str, title: str, data: str) -> str:
    """Create an HTML file with a title and content."""
    try:
        formatted_html = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>{title}</title>
        </head>
        <body>
            <h1>{title}</h1>
            <div>{data}</div>
        </body>
        </html>
        """
        with open(filename, "w", encoding="utf-8") as file:
            file.write(formatted_html)
        return f"HTML file created: {filename}"
    except Exception as e:
        return f"Error creating HTML file: {e}"


@function_tool()
async def generate_image(
    context: RunContext,
    prompt: str,
    filename: str,
    size: str = "1024x1024",
    save_dir: str = "generated_images"
) -> dict:
    """
    Generate an image from a text prompt using OpenAI's image model.
    - Saves the image locally.
    - Returns metadata including path, URL, and base64 string.
    """
    try:
        # Ensure save directory exists
        os.makedirs(save_dir, exist_ok=True)

        # Ensure filename ends with .png
        filename = filename if filename.endswith(".png") else filename + ".png"
        file_path = os.path.join(save_dir, filename)

        # Initialize OpenAI client
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        # Generate image
        response = client.images.generate(
            model="gpt-image-1",   # ✅ Correct model for image gen
            prompt=prompt,
            size=size,
            n=1
        )

        image_url = response.data[0].url

        # Download the image from URL
        img_response = requests.get(image_url, timeout=10)
        img_response.raise_for_status()

        # Save image locally
        image = Image.open(BytesIO(img_response.content))
        image.save(file_path)

        # Encode to base64 for LiveKit/web UI display
        with open(file_path, "rb") as f:
            b64_img = base64.b64encode(f.read()).decode("utf-8")

        return {
            "message": f"✅ Image generated successfully!",
            "file_path": file_path,
            "image_url": image_url,
            "image_base64": b64_img
        }

    except Exception as e:
        return {
            "message": f"❌ Error generating image: {e}",
            "file_path": None,
            "image_url": None,
            "image_base64": None
        }