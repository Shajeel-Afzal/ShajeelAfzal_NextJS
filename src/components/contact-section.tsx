import { ContactForm } from './contact-form';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Build Something{' '}
            <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Amazing Together
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to turn your ideas into reality? Get in touch and let's discuss how I can help bring your project to life.
          </p>
        </div>
        
        <ContactForm />
      </div>
    </section>
  );
}