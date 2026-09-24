import { media } from "@/data/media";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Renders a photo from src/data/media.ts, or a neutral labelled placeholder
 * when the slot has no image yet. In development the placeholder shows which
 * file to edit; in production it reads simply as a pending photo.
 */
export function ImageSlot({ id, className }: { id: string; className?: string }) {
  const slot = media[id];
  if (!slot) return null;
  const aspect = slot.aspect ?? "4 / 3";

  return (
    <figure className={`media ${className ?? ""}`}>
      <div className="media-frame" style={{ aspectRatio: aspect }}>
        {slot.src ? (
          // Plain <img>: the site is a static export, images are pre-sized by the author.
          <img src={slot.src} alt={slot.alt} loading="lazy" decoding="async" />
        ) : (
          <div className="media-placeholder" role="img" aria-label={`Photo pending: ${slot.label}`}>
            <svg className="media-icon" width="26" height="22" viewBox="0 0 26 22" aria-hidden="true">
              <rect x="1" y="4" width="24" height="17" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 4l2-3h6l2 3" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="13" cy="12.5" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <strong>{slot.label}</strong>
            {isDev ? (
              <>
                <span>{slot.brief}</span>
                <code>media.ts → &quot;{slot.id}&quot;</code>
              </>
            ) : (
              <span>Project photo to be added</span>
            )}
          </div>
        )}
      </div>
      {slot.src && slot.caption && <figcaption>{slot.caption}</figcaption>}
    </figure>
  );
}
