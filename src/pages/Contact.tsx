import { useState } from "react";

import { headquarters, otherOffices } from "../content/offices";
import { useLang } from "../context/lang";
import { submitToFormSubmit } from "../lib/formSubmit";

interface FormState {
  name: string;

  email: string;

  phone: string;

  company: string;

  enquiryType: string;

  message: string;
}

export default function Contact() {
  const { lang } = useLang();

  const zh = lang === "zh";

  const enquiryTypes = zh
    ? ["一般咨询", "项目咨询", "媒体咨询", "职业咨询", "合作意向"]
    : ["general enquiry", "project enquiry", "media enquiry", "career enquiry", "collaboration"];

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    enquiryType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const validate = () => {
    const e: typeof errors = {};

    if (!form.name.trim()) e.name = zh ? "请输入您的姓名" : "please enter your name";

    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = zh ? "请输入有效的电子邮件地址" : "please enter a valid email address";

    if (!form.enquiryType) e.enquiryType = zh ? "请选择咨询类型" : "please select an enquiry type";

    if (!form.message.trim()) e.message = zh ? "请输入您的留言" : "please enter your message";

    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    setErrors({});

    const payload = new FormData();
    payload.append("form_type", "website enquiry");
    payload.append("name", form.name);
    payload.append("email", form.email);
    payload.append("phone", form.phone);
    payload.append("company", form.company);
    payload.append("enquiry_type", form.enquiryType);
    payload.append("message", form.message);
    payload.append("_subject", `Website enquiry — ${form.enquiryType}`);
    payload.append("_template", "table");
    payload.append("_replyto", form.email);
    payload.append("_honey", "");

    try {
      await submitToFormSubmit(payload);
      setSubmitted(true);
    } catch {
      setSubmitError(
        zh
          ? "目前无法发送您的消息。请稍后重试或直接发送电子邮件至 info@ap-grp.com。"
          : "we could not send your message. please try again or email info@ap-grp.com directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const inputStyle = (hasError?: boolean): React.CSSProperties => ({
    width: "100%",

    border: `1px solid ${hasError ? "#c0392b" : "#dee2e6"}`,

    padding: "0.85rem 1rem",

    fontSize: "0.8rem",

    letterSpacing: "0.03em",

    color: "#212529",

    fontFamily: "inherit",

    outline: "none",

    backgroundColor: "#ffffff",

    transition: "border-color 0.2s ease",
  });

  return (
    <div style={{ paddingTop: "64px" }}>
      {/* Header */}
      <div
        style={{
          padding: "clamp(4rem,8vw,7rem) clamp(2rem,5vw,6rem) clamp(2rem,4vw,3rem)",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "#b4906e",
              marginBottom: "0.75rem",
            }}
          >
            {zh ? "联系" : "contact"}
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3.8rem)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
            }}
          >
            {zh ? "与我们联系" : "get in touch"}
          </h1>
        </div>
      </div>

      {/* Locate us */}
      <section
        style={{
          padding: "clamp(4rem,8vw,7rem) clamp(2rem,5vw,6rem)",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "#b4906e",
              marginBottom: "3rem",
            }}
          >
            {zh ? "工作室地址" : "locate us"}
          </p>

          {/* Singapore HQ — address + map */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "3rem",
              alignItems: "start",
              marginBottom: "4rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 400,
                  letterSpacing: "0.05em",
                  marginBottom: "1.5rem",
                  color: "#212529",
                }}
              >
                {headquarters.name[lang]}
              </h2>
              <address
                style={{
                  fontStyle: "normal",
                  fontSize: "0.82rem",
                  lineHeight: 2.1,
                  color: "#495057",
                  letterSpacing: "0.03em",
                  marginBottom: "2rem",
                }}
              >
                {headquarters.address[lang].map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
                <a
                  href={`mailto:${headquarters.email}`}
                  style={{ color: "#b4906e", textDecoration: "none" }}
                >
                  e: {headquarters.email}
                </a>
              </address>
              <a
                href={headquarters.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",

                  alignItems: "center",

                  gap: "0.5rem",

                  padding: "0.75rem 1.5rem",

                  border: "1px solid #212529",

                  color: "#212529",

                  textDecoration: "none",

                  fontSize: "0.7rem",

                  letterSpacing: "0.1em",

                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.backgroundColor = "#212529";
                  el.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.backgroundColor = "transparent";
                  el.style.color = "#212529";
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {zh ? "获取路线" : "get directions"}
              </a>
            </div>

            {/* Map */}
            <div
              style={{
                aspectRatio: "4/3",
                backgroundColor: "#e9ecef",
                overflow: "hidden",
              }}
            >
              <iframe
                src={headquarters.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: "none", display: "block" }}
                allowFullScreen={true}
                loading="lazy"
                title={`a+pgrp ${headquarters.name.en} location`}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Other offices */}
          <div style={{ borderTop: "1px solid #dee2e6", paddingTop: "3rem" }}>
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                color: "#9AA3AC",
                marginBottom: "2.5rem",
              }}
            >
              {zh ? "其他办公室" : "other offices"}
            </p>
            <div
              className="other-offices-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2.5rem 3rem",
              }}
            >
              {otherOffices.map((office) => (
                <div key={office.slug}>
                  <h3
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      color: "#212529",
                      marginBottom: "1rem",
                    }}
                  >
                    {office.name[lang]}
                  </h3>
                  <address
                    style={{
                      fontStyle: "normal",
                      fontSize: "0.78rem",
                      lineHeight: 2,
                      color: "#495057",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {office.address[lang].map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                    {office.phone && (
                      <>
                        t: {office.phone}
                        <br />
                      </>
                    )}
                    <a
                      href={`mailto:${office.email}`}
                      style={{ color: "#b4906e", textDecoration: "none" }}
                    >
                      e: {office.email}
                    </a>
                  </address>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section style={{ padding: "clamp(4rem,8vw,7rem) clamp(2rem,5vw,6rem)" }}>
        <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "clamp(3rem,6vw,5rem)",
              alignItems: "start",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "#b4906e",
                  marginBottom: "1rem",
                }}
              >
                {zh ? "发送消息" : "contact us"}
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                  marginBottom: "1.75rem",
                }}
              >
                {zh ? "向我们发送咨询" : "send us an enquiry"}
              </h2>
              <p
                style={{
                  fontSize: "0.8rem",
                  lineHeight: 1.8,
                  color: "#495057",
                  letterSpacing: "0.02em",
                  marginBottom: "2rem",
                }}
              >
                {zh
                  ? "我们欢迎各类规模与类型的项目咨询。无论您有具体的委托项目，还是希望探讨潜在的合作机会，我们都很乐意聆听。"
                  : "we welcome enquiries for projects of all scales and types. whether you have a specific commission in mind or simply wish to explore a potential collaboration, we would be glad to hear from you."}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <a
                  href="mailto:info@ap-grp.com"
                  style={{
                    fontSize: "0.78rem",
                    color: "#b4906e",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  info@ap-grp.com
                </a>
              </div>
            </div>

            <div>
              {submitted ? (
                <div
                  style={{
                    padding: "3rem",
                    border: "1px solid #dee2e6",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "1px solid #b4906e",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.5rem",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#b4906e"
                      strokeWidth="1.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 300,
                      marginBottom: "0.75rem",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {zh ? "消息已提交" : "message submitted"}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "#9AA3AC",
                      letterSpacing: "0.02em",
                      lineHeight: 1.7,
                    }}
                  >
                    {zh
                      ? "感谢您的联系。您的咨询已提交，我们的团队将尽快回复。"
                      : "thank you for getting in touch. your enquiry has been submitted and our team will respond shortly."}
                  </p>
                </div>
              ) : (
                <form
                  className="enquiry-form"
                  onSubmit={handleSubmit}
                  noValidate
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1.25rem",
                    }}
                  >
                    {[
                      {
                        field: "name" as const,
                        label: zh ? "姓名" : "name",
                        required: true,
                      },

                      {
                        field: "email" as const,
                        label: zh ? "电子邮件" : "email address",
                        required: true,
                      },
                    ].map(({ field, label, required }) => (
                      <div key={field}>
                        <label
                          style={{
                            display: "block",
                            fontSize: "0.65rem",
                            letterSpacing: "0.1em",
                            color: "#9AA3AC",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {label}
                          {required && <span style={{ color: "#b4906e" }}> *</span>}
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          value={form[field]}
                          onChange={handleChange(field)}
                          style={inputStyle(!!errors[field])}
                          onFocus={(e) => (e.target.style.borderColor = "#212529")}
                          onBlur={(e) =>
                            (e.target.style.borderColor = errors[field] ? "#c0392b" : "#dee2e6")
                          }
                        />
                        {errors[field] && (
                          <p
                            style={{
                              fontSize: "0.65rem",
                              color: "#c0392b",
                              marginTop: "0.35rem",
                            }}
                          >
                            {errors[field]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1.25rem",
                    }}
                  >
                    {[
                      {
                        field: "phone" as const,
                        label: zh ? "电话" : "phone",
                        required: false,
                      },

                      {
                        field: "company" as const,
                        label: zh ? "公司" : "company",
                        required: false,
                      },
                    ].map(({ field, label, required }) => (
                      <div key={field}>
                        <label
                          style={{
                            display: "block",
                            fontSize: "0.65rem",
                            letterSpacing: "0.1em",
                            color: "#9AA3AC",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {label}
                          {required && <span style={{ color: "#b4906e" }}> *</span>}
                        </label>
                        <input
                          type="text"
                          value={form[field]}
                          onChange={handleChange(field)}
                          style={inputStyle()}
                          onFocus={(e) => (e.target.style.borderColor = "#212529")}
                          onBlur={(e) => (e.target.style.borderColor = "#dee2e6")}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        color: "#9AA3AC",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {zh ? "咨询类型" : "enquiry type"} <span style={{ color: "#b4906e" }}>*</span>
                    </label>
                    <select
                      value={form.enquiryType}
                      onChange={handleChange("enquiryType")}
                      style={{
                        ...inputStyle(!!errors.enquiryType),
                        appearance: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">{zh ? "请选择…" : "select..."}</option>
                      {enquiryTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.enquiryType && (
                      <p
                        style={{
                          fontSize: "0.65rem",
                          color: "#c0392b",
                          marginTop: "0.35rem",
                        }}
                      >
                        {errors.enquiryType}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        color: "#9AA3AC",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {zh ? "留言" : "message"} <span style={{ color: "#b4906e" }}>*</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={handleChange("message")}
                      rows={5}
                      style={{
                        ...inputStyle(!!errors.message),
                        resize: "vertical",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#212529")}
                      onBlur={(e) =>
                        (e.target.style.borderColor = errors.message ? "#c0392b" : "#dee2e6")
                      }
                    />
                    {errors.message && (
                      <p
                        style={{
                          fontSize: "0.65rem",
                          color: "#c0392b",
                          marginTop: "0.35rem",
                        }}
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      marginTop: "0.5rem",

                      padding: "1rem 2rem",

                      backgroundColor: "#212529",

                      color: "#ffffff",

                      border: "none",

                      cursor: submitting ? "wait" : "pointer",
                      opacity: submitting ? 0.65 : 1,
                      fontSize: "0.7rem",

                      letterSpacing: "0.12em",

                      fontFamily: "inherit",

                      transition: "background-color 0.25s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b4906e")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#212529")}
                  >
                    {submitting
                      ? zh
                        ? "正在发送…"
                        : "sending..."
                      : zh
                        ? "发送消息"
                        : "send message"}
                  </button>
                  {submitError && (
                    <p
                      role="alert"
                      style={{
                        fontSize: "0.7rem",
                        color: "#c0392b",
                        lineHeight: 1.6,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {submitError}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 767px) {
          .other-offices-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
