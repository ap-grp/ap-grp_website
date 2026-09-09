export const FORM_SUBMIT_RECIPIENT = 'tskwilli4m@gmail.com'
export const FORM_SUBMIT_MAX_FILE_SIZE = 10 * 1024 * 1024
export const FORM_SUBMIT_FORM_ENDPOINT = `https://formsubmit.co/${FORM_SUBMIT_RECIPIENT}`
export const FORM_SUBMIT_SUCCESS_HASH = '#career-application-submitted'
export const FORM_SUBMIT_SUCCESS_MESSAGE = 'apgrp-career-application-submitted'
export const FORM_SUBMIT_WINDOW_NAME = 'apgrp-career-application'

const FORM_SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${FORM_SUBMIT_RECIPIENT}`

export const submitToFormSubmit = async (payload: FormData) => {
  const response = await fetch(FORM_SUBMIT_ENDPOINT, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: payload,
  })

  const result = await response.json().catch(() => null)
  if (!response.ok || result?.success === false || result?.success === 'false') {
    throw new Error(result?.message || 'Form submission failed')
  }
}
