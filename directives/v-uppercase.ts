const findInputElement = (el: HTMLElement): HTMLInputElement | null => {
  if (el.tagName === 'INPUT') {
    return el as HTMLInputElement;
  }
  const inputs = el.getElementsByTagName('input');
  return inputs.length > 0 ? inputs[0] : null;
};

const updateValue = (el: HTMLInputElement) => {
  const currentValue = el.value;
  const uppercasedValue = currentValue.toUpperCase();
  
  if (currentValue !== uppercasedValue) {
    el.value = uppercasedValue;
    el.dispatchEvent(new Event('input'));
  }
};

export default {
  beforeMount(el: HTMLElement) {
    const input = findInputElement(el);
    if (input) {
      const handler = () => updateValue(input);
      input._vUppercaseHandler = handler;
      input.addEventListener('input', handler);
    }
  },
  unmounted(el: HTMLElement) {
    const input = findInputElement(el);
    if (input && input._vUppercaseHandler) {
      input.removeEventListener('input', input._vUppercaseHandler);
      delete input._vUppercaseHandler;
    }
  },
};
