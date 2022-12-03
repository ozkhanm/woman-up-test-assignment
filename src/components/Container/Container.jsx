/**
 * 
 * @param {Object} props
 * @param {Array<React.Element>} props.children
 */
const Container = ({ children }) => {
  return (
    <div className="container">
      { children }
    </div>  
  );
};

export default Container;