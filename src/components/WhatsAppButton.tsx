const PHONE = "919958882810";
const MESSAGE =
  "Hello AURAUM, I would like to know more about booking a session for my space.";

export function WhatsAppButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with AURAUM on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-13 w-13 place-items-center rounded-full border border-gold/40 bg-background/80 text-gold shadow-lg backdrop-blur-xl transition-all duration-500 hover:scale-110 hover:border-gold hover:text-foreground md:bottom-8 md:right-8"
      style={{ height: "3.25rem", width: "3.25rem" }}
    >
      <span className="animate-breathe pointer-events-none absolute inset-0 rounded-full bg-gold/15 blur-md" />
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="relative h-6 w-6"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.04 2.003c-5.523 0-10 4.477-10 10 0 1.762.463 3.483 1.341 4.997L2 22.003l5.155-1.35a9.96 9.96 0 0 0 4.885 1.27h.004c5.522 0 9.999-4.477 9.999-10s-4.477-9.92-10.003-9.92zm0 18.27h-.003a8.28 8.28 0 0 1-4.216-1.155l-.303-.18-3.06.801.818-2.983-.197-.306a8.26 8.26 0 0 1-1.267-4.417c0-4.573 3.723-8.296 8.301-8.296a8.24 8.24 0 0 1 5.863 2.435 8.23 8.23 0 0 1 2.431 5.869c-.002 4.573-3.725 8.232-8.367 8.232z" />
      </svg>
    </a>
  );
}
