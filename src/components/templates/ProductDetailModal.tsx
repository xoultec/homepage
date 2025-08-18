/**
 * XoulTec Templates - Product Detail Modal
 * Copyright © 2025 XoulTec, LLC
 * All rights reserved.
 */

import { useEffect, useRef } from "react";
import type { LemonSqueezyProduct } from "../../services/lemonsqueezy";

interface ProductDetailModalProps {
  product: LemonSqueezyProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onBuyNow: (product: LemonSqueezyProduct) => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onBuyNow,
}: ProductDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle modal open/close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && product) {
      dialog.showModal();
      // Focus the close button when modal opens
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      dialog.close();
    }
  }, [isOpen, product]);

  // Handle keyboard navigation and focus trapping
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const trapFocus = (e: KeyboardEvent) => {
      if (!isOpen) return;

      const focusableElements = dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.key === "Tab") {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      } else if (e.key === "Escape") {
        onClose();
        e.preventDefault();
      }
    };

    const handleBackdropClick = (e: MouseEvent) => {
      // Only close if clicking the dialog backdrop (not the modal-box content)
      if (e.target === dialog) {
        onClose();
      }
    };

    dialog.addEventListener("keydown", trapFocus);
    dialog.addEventListener("click", handleBackdropClick);

    return () => {
      dialog.removeEventListener("keydown", trapFocus);
      dialog.removeEventListener("click", handleBackdropClick);
    };
  }, [isOpen, onClose]);

  if (!product) return null;

  const handleBuyClick = () => {
    onBuyNow(product);
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      role="dialog"
      aria-labelledby={`product-${product.id}-title`}
      aria-describedby={`product-${product.id}-description`}
    >
      <div className="modal-box w-11/12 max-w-4xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6 border-b border-base-300 pb-4 flex-shrink-0">
          <h3
            id={`product-${product.id}-title`}
            className="font-bold text-2xl pr-4"
          >
            {product.name}
          </h3>
          <button
            ref={closeButtonRef}
            className="btn btn-sm btn-circle bg-base-200 border border-base-300 hover:bg-base-300 flex-shrink-0"
            aria-label={`Close ${product.name} details`}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto lg:overflow-visible">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:h-full lg:items-start">
            {/* Left Column - Image and Purchase */}
            <div className="flex flex-col lg:h-full lg:overflow-visible">
              {/* Product Image */}
              <div className="mb-4 flex-shrink-0">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={`${product.name} Template`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-64 bg-base-200 rounded-lg flex items-center justify-center">
                    <div className="text-base-content/40">
                      <svg
                        className="w-16 h-16"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Category Badge */}
              {product.category && (
                <div className="mb-4 flex-shrink-0">
                  <div className="badge badge-primary">{product.category}</div>
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="badge badge-ghost badge-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Price and Purchase */}
              <div className="mt-4 lg:mt-auto flex-shrink-0">
                <div className="bg-base-200 p-4 rounded-lg">
                  <div className="flex flex-col items-center text-center">
                    {product.hasVariants && (
                      <span className="text-xs text-base-content/60 uppercase tracking-wide mb-1">
                        Starting at
                      </span>
                    )}
                    <div className="flex items-center justify-center mb-3">
                      <span className="text-3xl font-bold text-primary">
                        {product.from_price_formatted ||
                          `$${product.price.toFixed(2)}`}
                      </span>
                      {!product.from_price_formatted && (
                        <span className="text-sm text-base-content/60 ml-1">
                          {product.currency}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={handleBuyClick}
                      className="btn btn-primary btn-wide"
                    >
                      Buy Now
                    </button>
                    <p className="text-xs text-base-content/60 mt-2">
                      Instant download via email
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Description and Details */}
            <div
              className="lg:overflow-y-auto lg:pr-2"
              style={{ height: "calc(90vh - 8rem)" }}
              id={`product-${product.id}-description`}
            >
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">Description</h4>
                  <p className="text-base-content/80 leading-relaxed">
                    {product.description ||
                      "No description available for this template."}
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-lg font-semibold mb-3">
                    What's Included
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-base-content/80">
                    <li>Complete source code and assets</li>
                    <li>Documentation and setup instructions</li>
                    <li>Responsive design for all devices</li>
                    <li>Modern, clean codebase</li>
                    <li>Easy customization and branding</li>
                  </ul>
                </div>

                {/* License Options / Variants */}
                {product.variants && product.variants.length > 0 ? (
                  <div>
                    <h4 className="text-lg font-semibold mb-3">
                      License Options
                    </h4>
                    <div className="space-y-3">
                      {product.variants.map((variant) => (
                        <div
                          key={variant.id}
                          className="bg-base-200 p-4 rounded-lg"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-semibold">{variant.name}</div>
                            <div className="text-lg font-bold text-primary">
                              ${variant.price.toFixed(2)}
                            </div>
                          </div>
                          {variant.description && (
                            <div className="text-sm text-base-content/70 leading-relaxed">
                              {variant.description
                                .split("\n")
                                .map((line, index) => (
                                  <div key={index}>{line}</div>
                                ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-lg font-semibold mb-3">
                      Technical Details
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-base-200 p-3 rounded">
                        <div className="font-semibold text-sm">Framework</div>
                        <div className="text-base">React + TypeScript</div>
                      </div>
                      <div className="bg-base-200 p-3 rounded">
                        <div className="font-semibold text-sm">Styling</div>
                        <div className="text-base">TailwindCSS + DaisyUI</div>
                      </div>
                      <div className="bg-base-200 p-3 rounded">
                        <div className="font-semibold text-sm">License</div>
                        <div className="text-base">Standard License</div>
                      </div>
                      <div className="bg-base-200 p-3 rounded">
                        <div className="font-semibold text-sm">Support</div>
                        <div className="text-base">Email Support</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Support Note */}
                <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                  <h5 className="font-semibold text-base-content mb-2">
                    ✨ Premium Support
                  </h5>
                  <p className="text-sm text-base-content/70">
                    Get help with installation, customization, and any questions
                    you might have. Email support is included with your
                    purchase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  );
}
