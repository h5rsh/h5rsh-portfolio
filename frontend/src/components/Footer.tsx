const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container max-w-2xl mx-auto px-6 text-center">
        <p className="text-muted-foreground font-mono text-sm italic">
          "Consistentcy is not built in perfect conditions, its built when life gets messy and you show up anyway"
        </p>
        <p className="mt-4 text-xs text-muted-foreground/50 font-mono">
          © {new Date().getFullYear()} · Built with passion
        </p>
      </div>
    </footer>
  );
};

export default Footer;
