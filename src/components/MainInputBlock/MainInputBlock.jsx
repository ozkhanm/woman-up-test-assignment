const MainInputBlock = () => {
  return (
    <div className="form__main-input-container">
      <input className="form__title-input" type="text" placeholder="What to do..." />
      <button className="form__submit-button button" type="submit">Submit</button>
    </div>
  );
};

export default MainInputBlock;