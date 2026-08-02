/** True when keyboard input belongs to the element and no shortcuts may fire. */
export function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false
  }
  return (
    target.isContentEditable ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  )
}

/** Editable targets plus open dialogs — global canvas shortcuts must not fire there. */
export function isUiOwnedTarget(target: EventTarget | null): boolean {
  if (isEditableTarget(target)) {
    return true
  }
  return target instanceof HTMLElement && target.closest('[role="dialog"]') !== null
}
