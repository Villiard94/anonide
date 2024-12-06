import { Anonymizer } from "@anonide/anonymizer";

function createAnonymizeButton(element: HTMLElement) {
  const button = document.createElement("button");
  button.textContent = "Anonide";
  button.type = "button";
  button.style.cssText = `
    position: absolute;
    right: 50px;
    bottom: 10px;
    padding: 4px 8px;
    background: white;
    color: black;
    border: none;
    border-radius: 25px;
    cursor: pointer;
  `;

  button.addEventListener("click", async () => {
    const promptArea = document.querySelector("#prompt-textarea") as HTMLDivElement;

    const originalText = promptArea.innerHTML;
    const anonymizedText = await new Anonymizer().anonymize(originalText);
    promptArea.innerHTML = anonymizedText;
  });

  // Create a wrapper div to position the button relative to textarea
  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  wrapper.style.display = "inline-block";

  // Replace textarea with wrapper containing textarea and button
  element.appendChild(button);
  console.log("attached!");
}

function init() {
  // Find all textareas and add buttons
  const textareas = document.querySelectorAll("#composer-background");
  textareas.forEach((e) => createAnonymizeButton(e as HTMLElement));

  // Watch for dynamically added textareas
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLTextAreaElement) {
          createAnonymizeButton(node);
        }
        if (node instanceof Element) {
          node.querySelectorAll("textarea").forEach(createAnonymizeButton);
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
