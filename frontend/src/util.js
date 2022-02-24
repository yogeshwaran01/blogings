export const convertDate = (isoString) => {
    const date = new Date (isoString)
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    return dateTimeFormat.format(date)
}
