import printJS from "print-js"

/**
 * Custom hook for printing a document from a given URL.
 * Uses the print-js library to print the document.
 *
 * @param {string} url - The URL of the document to be printed.
 * @returns {void} This hook does not return a value.
 */
const usePrint = (url) => {
  printJS({ printable: url, type: "pdf", showModal: true })
}

export default usePrint
