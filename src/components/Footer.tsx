const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container max-w-2xl mx-auto px-6 text-center">
        <p className="text-muted-foreground font-mono text-sm italic">
          "Arise, awake, and stop not till the goal is reached."
        </p>
        <p className="mt-4 text-xs text-muted-foreground/50 font-mono">
          © {new Date().getFullYear()} · Built with passion
        </p>
      </div>
    </footer>
  );
};

export default Footer;
