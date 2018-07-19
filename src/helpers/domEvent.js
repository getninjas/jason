export default (selector, eventType) => {
  const elements = [...document.querySelectorAll(selector)];
  const event = new Event(eventType);

  elements.map(elmt => (elmt.dispatchEvent(event)));
};
