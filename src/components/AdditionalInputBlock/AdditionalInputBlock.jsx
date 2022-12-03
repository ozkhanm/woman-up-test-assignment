const AdditionalInputBlock = () => {
  return (
    <div className="form__additional-input-container">
      <textarea className="form__description-input" placeholder="Task description" />
      <input className="form__date-input" type="date" />
      <label className="form__file-input-label" htmlFor="main-file-input">
        <input className="form__file-input visually-hidden" type="file" id="main-file-input" />
      </label>
    </div>
  );
};

export default AdditionalInputBlock;