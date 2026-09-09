import { useState, useEffect, useRef } from "react";
import FadeSection from "../components/FadeSection";
import ResponsiveImage from "../components/ResponsiveImage";
import { careerFaqs, careerListings, careersImages } from "../content/careers";
import { useLang } from "../context/lang";
import {
  FORM_SUBMIT_FORM_ENDPOINT,
  FORM_SUBMIT_MAX_FILE_SIZE,
  FORM_SUBMIT_SUCCESS_HASH,
  FORM_SUBMIT_SUCCESS_MESSAGE,
  FORM_SUBMIT_WINDOW_NAME,
} from "../lib/formSubmit";

interface FormState {
  name: string;

  email: string;

  phone: string;

  position: string;

  message: string;

  file: File | null;
}

export default function Careers() {
  const { lang } = useLang();

  const zh = lang === "zh";
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
    file: null,
  });
  const [submitted, setSubmitted] = useState(
    () => window.location.hash === FORM_SUBMIT_SUCCESS_HASH,
  );
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const submissionWindowRef = useRef<Window | null>(null);
  const applicationSuccessUrl = `${window.location.origin}${window.location.pathname}${FORM_SUBMIT_SUCCESS_HASH}`;

  useEffect(() => {
    const handleSubmissionMessage = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== submissionWindowRef.current ||
        event.data !== FORM_SUBMIT_SUCCESS_MESSAGE
      )
        return;
      submissionWindowRef.current = null;
      setSubmitted(true);
      document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
    };

    window.addEventListener("message", handleSubmissionMessage);
    return () => window.removeEventListener("message", handleSubmissionMessage);
  }, []);

  useEffect(() => {
    if (window.location.hash !== FORM_SUBMIT_SUCCESS_HASH) return;

    if (window.name === FORM_SUBMIT_WINDOW_NAME && window.opener && !window.opener.closed) {
      window.opener.postMessage(FORM_SUBMIT_SUCCESS_MESSAGE, window.location.origin);
      window.close();
      return;
    }

    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
  }, []);

  const validate = () => {
    const e: typeof errors = {};

    if (!form.name.trim()) e.name = zh ? "请输入您的姓名" : "please enter your name";

    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = zh ? "请输入有效的电子邮件地址" : "please enter a valid email address";
    if (!form.position.trim())
      e.position = zh ? "请说明您申请的职位" : "please specify the position you are applying for";
    if (!form.message.trim())
      e.message = zh ? "请附上一段简短的自我介绍" : "please include a short message";
    if (!form.file)
      e.file = zh
        ? "请上传包含所有申请材料的ZIP文件"
        : "please upload one zip file containing all application documents";
    if (form.file && !form.file.name.toLowerCase().endsWith(".zip"))
      e.file = zh ? "请仅上传ZIP文件" : "please upload a zip file only";
    if (form.file && form.file.size > FORM_SUBMIT_MAX_FILE_SIZE)
      e.file = zh ? "ZIP文件不得超过10MB" : "the zip file must be 10mb or smaller";
    return e;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      e.preventDefault();
      setErrors(errs);
      return;
    }

    setErrors({});
    const submissionTab = window.open("", FORM_SUBMIT_WINDOW_NAME);
    submissionWindowRef.current = submissionTab;
    e.currentTarget.target = submissionTab ? FORM_SUBMIT_WINDOW_NAME : "_self";
    submissionTab?.focus();
  };

  const handleChange =
    (field: keyof Omit<FormState, "file">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, file }));
    if (errors.file) setErrors((prev) => ({ ...prev, file: undefined }));
  };

  const handleRemoveFile = () => {
    setForm((prev) => ({ ...prev, file: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (errors.file) setErrors((prev) => ({ ...prev, file: undefined }));
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
      {/* Header hero */}
      <div
        style={{
          position: "relative",

          backgroundColor: "#212529",

          overflow: "hidden",

          padding: "clamp(5rem,10vw,9rem) clamp(2rem,5vw,6rem)",
        }}
      >
        <ResponsiveImage
          src={careersImages.hero}
          alt="studio"
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.22,
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "760px" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "1.25rem",
            }}
          >
            {zh ? "职业发展" : "careers"}
          </p>
          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "#ffffff",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              marginBottom: "1.75rem",
            }}
          >
            {zh ? "优秀建筑始于人" : "good architecture begins with people"}
          </h1>
          <p
            style={{
              fontSize: "0.88rem",
              lineHeight: 1.85,
              color: "rgba(255,255,255,0.6)",
              maxWidth: "560px",
              letterSpacing: "0.02em",
            }}
          >
            {zh
              ? "我们始终欢迎充满好奇心、深思熟虑且乐于协作的人才，共同创造有意义的场所。"
              : "we are always looking for curious, thoughtful and collaborative individuals who want to create meaningful places with us."}
          </p>
        </div>
      </div>

      {/* Culture section */}
      <section
        style={{
          padding: "clamp(4rem,8vw,7rem) clamp(2rem,5vw,6rem)",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "clamp(3rem,6vw,5rem)",
              alignItems: "start",
            }}
          >
            <FadeSection>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "#b4906e",
                  marginBottom: "1rem",
                }}
              >
                {zh ? "在a+pgrp工作" : "working at a+pgrp"}
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                }}
              >
                {zh ? "严谨、好奇与关怀并存的文化" : "a culture of rigour, curiosity, and care"}
              </h2>
            </FadeSection>
            <FadeSection delay={0.15}>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.9,
                  color: "#495057",
                  marginBottom: "1.25rem",
                  letterSpacing: "0.02em",
                }}
              >
                {zh
                  ? "我们是一个约三十人的工作室——规模适中，每个人都能发挥有意义的作用、清晰表达自己的声音；同时又足够成熟，能够承接复杂而重要的项目。我们的文化以严谨的思维、慷慨的精神和对工作品质的深切追求为核心。"
                  : "we are a close-knit core team based in singapore, supported by talented colleagues across our regional offices. our collaborative way of working means everyone has the opportunity to contribute, take ownership, and make a meaningful impact on the projects we undertake."}
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.9,
                  color: "#495057",
                  letterSpacing: "0.02em",
                }}
              >
                {zh
                  ? "团队虽精，但志向远大。随着业务不断拓展，并持续参与区域内更多元、更具挑战性的项目，我们期待更多志同道合、充满热忱的人才加入，与我们一同成长。我们相信，优秀的设计源于信任、挑战与支持并行的工作环境。"
                  : "we may be lean in numbers, but our ambitions are far-reaching. as we continue to grow and take on increasingly diverse work across the region, we're always looking for thoughtful and motivated people to join us. we believe the best ideas come from people who are trusted, challenged, and supported every step of the way."}
              </p>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* Current openings */}
      <section
        style={{
          padding: "clamp(4rem,8vw,7rem) clamp(2rem,5vw,6rem)",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
          <FadeSection>
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                color: "#b4906e",
                marginBottom: "3rem",
              }}
            >
              {zh ? "当前招聘职位" : "current openings"}
            </p>
          </FadeSection>
          <div>
            {careerListings.map((job, i) => (
              <FadeSection key={i} delay={i * 0.08}>
                <div
                  style={{
                    padding: "2rem 0",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "1rem",
                      flexWrap: "nowrap",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: "0.95rem",
                          fontWeight: 400,
                          letterSpacing: "0.04em",
                          marginBottom: "0.4rem",
                          color: "#212529",
                        }}
                      >
                        {zh ? job.zhTitle : job.title}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          gap: "1.25rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.65rem",
                            color: "#9AA3AC",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {zh ? job.zhDepartment : job.department}
                        </span>
                        <span
                          style={{
                            fontSize: "0.65rem",
                            color: "#9AA3AC",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {job.location}
                        </span>
                        <span
                          style={{
                            fontSize: "0.6rem",

                            letterSpacing: "0.08em",

                            color: job.type === "internship" ? "#b4906e" : "#212529",

                            border: `1px solid ${
                              job.type === "internship" ? "#b4906e" : "#dee2e6"
                            }`,

                            padding: "2px 8px",
                          }}
                        >
                          {zh ? job.zhType : job.type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setForm((prev) => ({ ...prev, position: job.title }));

                        document
                          .getElementById("apply-form")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      style={{
                        padding: "0.55rem 1.25rem",

                        backgroundColor: "transparent",

                        border: "1px solid #212529",

                        cursor: "pointer",

                        fontSize: "0.65rem",

                        letterSpacing: "0.1em",

                        color: "#212529",

                        fontFamily: "inherit",

                        transition: "all 0.2s ease",

                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#212529";
                        e.currentTarget.style.color = "#ffffff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#212529";
                      }}
                    >
                      {zh ? "申请" : "apply"}
                    </button>
                  </div>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#495057",
                      lineHeight: 1.75,
                      letterSpacing: "0.02em",
                      marginTop: "1rem",
                      maxWidth: "640px",
                    }}
                  >
                    {zh ? job.zhDescription : job.description}
                  </p>
                  <div
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    {(zh ? job.zhRequirements : job.requirements).slice(0, 3).map((r, ri) => (
                      <span
                        key={ri}
                        style={{
                          fontSize: "0.62rem",
                          letterSpacing: "0.04em",
                          color: "#9AA3AC",
                          backgroundColor: "#f8f9fa",
                          padding: "3px 10px",
                        }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section
        id="apply-form"
        style={{
          padding: "clamp(4rem,8vw,7rem) clamp(2rem,5vw,6rem)",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "clamp(3rem,6vw,5rem)",
              alignItems: "start",
            }}
          >
            <FadeSection>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "#b4906e",
                  marginBottom: "1rem",
                }}
              >
                {zh ? "申请" : "apply"}
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                  marginBottom: "1.25rem",
                }}
              >
                {zh ? "发送申请" : "send us your application"}
              </h2>
              <p
                style={{
                  fontSize: "0.8rem",
                  lineHeight: 1.8,
                  color: "#495057",
                  letterSpacing: "0.02em",
                }}
              >
                {zh
                  ? "请填写表格并附上您的简历和作品集。我们将在四周内与您联系。"
                  : "complete the form and attach your resume and portfolio. we will be in touch within four weeks."}
                <br />
                {zh
                  ? "或者，将您的申请材料直接发送至 "
                  : "alternatively, email your application directly to "}
                <a
                  href="mailto:info@ap-grp.com"
                  style={{
                    color: "#b4906e",
                    textDecoration: "none",
                    font: "inherit",
                    letterSpacing: "inherit",
                  }}
                >
                  info@ap-grp.com
                </a>
                .
              </p>
            </FadeSection>

            <FadeSection delay={0.15}>
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
                      {zh ? "申请已提交" : "application submitted"}
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
                        ? "感谢您对a+pgrp的关注。您的申请已提交，我们将在四周内与入围申请者联系。"
                        : "thank you for your interest in a+pgrp. your application has been submitted and shortlisted applicants will be contacted within four weeks."}
                    </p>
                  </div>
                ) : (
                  <form
                    className="enquiry-form"
                    action={FORM_SUBMIT_FORM_ENDPOINT}
                    method="POST"
                    encType="multipart/form-data"
                    target={FORM_SUBMIT_WINDOW_NAME}
                    onSubmit={handleSubmit}
                    noValidate
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.25rem",
                    }}
                  >
                    <input type="hidden" name="form_type" value="career application" />
                    <input
                      type="hidden"
                      name="_subject"
                      value={`Job application — ${form.position} — ${form.name}`}
                    />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_replyto" value={form.email} />
                    <input type="hidden" name="_next" value={applicationSuccessUrl} />
                    <input
                      type="text"
                      name="_honey"
                      tabIndex={-1}
                      autoComplete="off"
                      style={{ display: "none" }}
                    />
                    {[
                      {
                        field: "name" as const,
                        label: zh ? "姓名" : "full name",
                        type: "text",
                        required: true,
                      },

                      {
                        field: "email" as const,
                        label: zh ? "电子邮件" : "email address",
                        type: "email",
                        required: true,
                      },

                      {
                        field: "phone" as const,
                        label: zh ? "电话号码" : "phone number",
                        type: "tel",
                        required: false,
                      },
                    ].map(({ field, label, type, required }) => (
                      <div key={field}>
                        <label
                          className="file-upload-label"
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
                          name={field}
                          type={type}
                          value={form[field] as string}
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
                              letterSpacing: "0.04em",
                            }}
                          >
                            {errors[field]}
                          </p>
                        )}
                      </div>
                    ))}

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
                        {zh ? "申请职位" : "position applied for"}{" "}
                        <span style={{ color: "#b4906e" }}>*</span>
                      </label>
                      <select
                        name="position"
                        value={form.position}
                        onChange={handleChange("position")}
                        style={{
                          ...inputStyle(!!errors.position),
                          appearance: "none",
                          cursor: "pointer",
                        }}
                      >
                        <option value="">{zh ? "选择职位…" : "select position..."}</option>
                        {careerListings.map((j) => (
                          <option key={j.title} value={j.title}>
                            {j.title}
                          </option>
                        ))}
                        <option value="general application">
                          {zh ? "主动申请" : "general application"}
                        </option>
                      </select>
                      {errors.position && (
                        <p
                          style={{
                            fontSize: "0.65rem",
                            color: "#c0392b",
                            marginTop: "0.35rem",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {errors.position}
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
                        {zh ? "简短介绍" : "short message"}{" "}
                        <span style={{ color: "#b4906e" }}>*</span>
                      </label>
                      <textarea
                        name="message"
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
                            letterSpacing: "0.04em",
                          }}
                        >
                          {errors.message}
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
                        {zh
                          ? "申请材料（1个ZIP文件 — 最大10MB）"
                          : "application documents (1 zip file — max 10mb)"}{" "}
                        <span style={{ color: "#b4906e" }}>*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <label
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            border: `1px solid ${errors.file ? "#c0392b" : "#dee2e6"}`,
                            padding: `0.85rem ${form.file ? "4rem" : "1rem"} 0.85rem 1rem`,
                            cursor: "pointer",
                            transition: "border-color 0.2s ease",
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#9AA3AC"
                            strokeWidth="1.5"
                            style={{ flexShrink: 0 }}
                          >
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                          </svg>
                          <span
                            className={form.file ? "uploaded-file-name" : undefined}
                            style={{
                              minWidth: 0,
                              flex: 1,
                              fontSize: "0.78rem",
                              color: form.file ? "#212529" : "#9AA3AC",
                              letterSpacing: "0.03em",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {form.file
                              ? form.file.name
                              : zh
                                ? "点击上传文件"
                                : "click to upload file"}
                          </span>
                          <input
                            ref={fileInputRef}
                            name="attachment"
                            type="file"
                            accept=".zip,application/zip,application/x-zip-compressed"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                        </label>
                        {form.file && (
                          <button
                            type="button"
                            aria-label={zh ? "移除上传文件" : "remove uploaded file"}
                            title={zh ? "移除上传文件" : "remove uploaded file"}
                            onClick={handleRemoveFile}
                            style={{
                              position: "absolute",
                              zIndex: 1,
                              top: 0,
                              right: 0,
                              bottom: 0,
                              width: "3rem",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "none",
                              borderLeft: "1px solid #dee2e6",
                              backgroundColor: "#ffffff",
                              color: "#9AA3AC",
                              cursor: "pointer",
                              fontFamily: "inherit",
                              fontSize: "1.2rem",
                              fontWeight: 300,
                              lineHeight: 1,
                              transition: "color 0.2s ease, background-color 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "#212529";
                              e.currentTarget.style.backgroundColor = "#f8f9fa";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "#9AA3AC";
                              e.currentTarget.style.backgroundColor = "#ffffff";
                            }}
                          >
                            ×
                          </button>
                        )}
                      </div>
                      {errors.file && (
                        <p
                          style={{
                            fontSize: "0.65rem",
                            color: "#c0392b",
                            marginTop: "0.35rem",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {errors.file}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      style={{
                        marginTop: "0.5rem",

                        padding: "1rem 2rem",

                        backgroundColor: "#212529",

                        color: "#ffffff",

                        border: "none",

                        cursor: "pointer",
                        fontSize: "0.7rem",

                        letterSpacing: "0.12em",

                        fontFamily: "inherit",

                        transition: "background-color 0.25s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b4906e")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#212529")}
                    >
                      {zh ? "提交申请" : "submit application"}
                    </button>
                  </form>
                )}
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
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
            <FadeSection>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "#b4906e",
                  marginBottom: "1rem",
                }}
              >
                faq
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                }}
              >
                {zh ? "常见问题" : "frequently asked questions"}
              </h2>
            </FadeSection>
            <FadeSection delay={0.15}>
              <div>
                {careerFaqs.map((faq, i) => (
                  <div key={i} style={{ borderBottom: "1px solid #dee2e6" }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{
                        display: "flex",

                        justifyContent: "space-between",

                        alignItems: "center",

                        width: "100%",

                        background: "none",

                        border: "none",

                        cursor: "pointer",

                        padding: "1.5rem 0",

                        textAlign: "left",

                        gap: "1rem",

                        fontFamily: "inherit",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.82rem",
                          letterSpacing: "0.03em",
                          color: "#212529",
                          fontWeight: openFaq === i ? 500 : 400,
                        }}
                      >
                        {faq.question[lang]}
                      </span>
                      <span
                        style={{
                          fontSize: "1.1rem",
                          color: "#b4906e",
                          flexShrink: 0,
                          transform: openFaq === i ? "rotate(45deg)" : "none",
                          transition: "transform 0.3s ease",
                          lineHeight: 1,
                        }}
                      >
                        +
                      </span>
                    </button>
                    <div
                      style={{
                        maxHeight: openFaq === i ? "200px" : 0,
                        overflow: "hidden",
                        transition: "max-height 0.35s ease",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.8rem",
                          lineHeight: 1.85,
                          color: "#495057",
                          letterSpacing: "0.02em",
                          paddingBottom: "1.5rem",
                        }}
                      >
                        {faq.answer[lang]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeSection>
          </div>
        </div>
      </section>
    </div>
  );
}
