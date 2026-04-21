import { cn } from "@/lib/utils";

export interface BitInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
}

function Input({ className, ...props }: BitInputProps) {
  return (
    <input
      className={cn(
        "w-full bg-transparent border-2 border-white/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors",
        className
      )}
      {...props}
    />
  );
}

export interface BitTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: React.Ref<HTMLTextAreaElement>;
}

function Textarea({ className, ...props }: BitTextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full bg-transparent border-2 border-white/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors resize-none",
        className
      )}
      {...props}
    />
  );
}

export { Input, Textarea };
