import { useState } from "react";
import { useForm } from "@tanstack/react-form";

interface ContactMethod {
  icon: string;
  text: string;
  href: string;
}

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
}

const contactMethods: ContactMethod[] = [
  {
    icon: "📞",
    text: "Call Us: +1 (816) 919-3349",
    href: "tel:+18169193349",
  },
  {
    icon: "✉️",
    text: "Email Us: support@xoultec.com",
    href: "mailto:support@xoultec.com",
  },
];

export default function Contact() {
  const [submitMessage, setSubmitMessage] = useState("");

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      message: "",
    } as ContactFormData,
    onSubmit: async ({ value }) => {
      setSubmitMessage("");

      try {
        // For now, we'll just show a success message
        // In production, you would send this to your backend API
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

        console.log("Form submitted:", value);
        setSubmitMessage(
          "Thank you for your message! We will get back to you soon."
        );
        form.reset();
      } catch (error) {
        setSubmitMessage(
          "Failed to send message. Please try again or contact us directly."
        );
      }
    },
  });

  return (
    <section id="contact" className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-8">Contact Us</h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                className="btn btn-outline btn-primary"
              >
                {method.icon} {method.text}
              </a>
            ))}
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl max-w-3xl mx-auto">
          <div className="card-body p-8">
            <h3 className="text-2xl font-bold text-center mb-8">
              Send us a message
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <form.Field
                  name="name"
                  validators={{
                    onChange: ({ value }) =>
                      !value
                        ? "Name is required"
                        : value.length < 2
                          ? "Name must be at least 2 characters"
                          : undefined,
                  }}
                  children={(field) => (
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Name *</legend>
                      <input
                        type="text"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={`input w-full ${field.state.meta.errors.length ? "input-error" : ""}`}
                        placeholder="Your full name"
                      />
                      {field.state.meta.errors.length > 0 ? (
                        <p className="label text-error">
                          {field.state.meta.errors[0]}
                        </p>
                      ) : (
                        <p className="label">Required field</p>
                      )}
                    </fieldset>
                  )}
                />

                <form.Field
                  name="email"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) return "Email is required";
                      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                        return "Please enter a valid email address";
                      return undefined;
                    },
                  }}
                  children={(field) => (
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Email *</legend>
                      <input
                        type="email"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={`input w-full ${field.state.meta.errors.length ? "input-error" : ""}`}
                        placeholder="your@email.com"
                      />
                      {field.state.meta.errors.length > 0 ? (
                        <p className="label text-error">
                          {field.state.meta.errors[0]}
                        </p>
                      ) : (
                        <p className="label">Required field</p>
                      )}
                    </fieldset>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <form.Field
                  name="company"
                  children={(field) => (
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Company</legend>
                      <input
                        type="text"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="input w-full"
                        placeholder="Your company name"
                      />
                      <p className="label">Optional</p>
                    </fieldset>
                  )}
                />

                <form.Field
                  name="projectType"
                  children={(field) => (
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Project Type</legend>
                      <select
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="select w-full"
                      >
                        <option value="" disabled>
                          Select project type
                        </option>
                        <option value="web-development">Web Development</option>
                        <option value="mobile-app">Mobile App</option>
                        <option value="corporate-email">Corporate Email</option>
                        <option value="antivirus">Antivirus Security</option>
                        <option value="other">Other</option>
                      </select>
                      <p className="label">Optional</p>
                    </fieldset>
                  )}
                />
              </div>

              <form.Field
                name="budget"
                children={(field) => (
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Budget Range</legend>
                    <select
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="select w-full"
                    >
                      <option value="" disabled>
                        Select budget range
                      </option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-15k">$5,000 - $15,000</option>
                      <option value="15k-50k">$15,000 - $50,000</option>
                      <option value="over-50k">Over $50,000</option>
                    </select>
                    <p className="label">Optional</p>
                  </fieldset>
                )}
              />

              <form.Field
                name="message"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Message is required"
                      : value.length < 10
                        ? "Message must be at least 10 characters"
                        : undefined,
                }}
                children={(field) => (
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Message *</legend>
                    <textarea
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`textarea h-24 w-full ${field.state.meta.errors.length ? "textarea-error" : ""}`}
                      placeholder="Tell us about your project requirements..."
                    />
                    {field.state.meta.errors.length > 0 ? (
                      <div className="label text-error">
                        {field.state.meta.errors[0]}
                      </div>
                    ) : (
                      <div className="label">Required field</div>
                    )}
                  </fieldset>
                )}
              />

              {submitMessage && (
                <div
                  className={`alert ${submitMessage.includes("Thank you") ? "alert-success" : "alert-error"}`}
                >
                  {submitMessage}
                </div>
              )}

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <div className="form-control mt-8">
                    <button
                      type="submit"
                      className={`btn btn-primary btn-lg w-full ${isSubmitting ? "loading" : ""}`}
                      disabled={!canSubmit || isSubmitting}
                    >
                      {isSubmitting ? "Sending Message..." : "Send Message"}
                    </button>
                  </div>
                )}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
