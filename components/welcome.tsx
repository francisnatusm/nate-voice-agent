import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WelcomeProps {
  disabled: boolean;
  startButtonText: string;
  onStartCall: () => void;
}

export const Welcome = ({
  disabled,
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeProps) => {
  return (
    <section
      ref={ref}
      inert={disabled}
      className={cn(
        'fixed inset-0 mx-auto flex h-svh flex-col items-center justify-center bg-transparent text-center',
        disabled ? 'z-10' : 'z-20'
      )}
    >
      <Image
        src="/ark_reactor.png"
        alt="Ark Reactor"
        width={256}
        height={256}
        className="mb-4"
        priority
      />

      <p className="text-fg1 max-w-prose pt-1 leading-6 font-medium">
        Chat with the advanced Nate Agent
      </p>
      <Button variant="primary" size="lg" onClick={onStartCall} className="mt-6 w-64 font-mono">
        {startButtonText}
      </Button>
      <footer className="fixed bottom-5 left-0 z-20 flex w-full items-center justify-center"></footer>
    </section>
  );
};
