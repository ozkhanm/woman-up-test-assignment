/**
 * 
 * @param {Object} props
 * @param {String} props.attachment
 */
const AttachmentItem = ({ attachment }) => {
  return (
    <li>
      { attachment }
    </li>
  );
};

/**
 * 
 * @param {Object} props 
 * @param {String} props.id
 * @param {String} props.description
 * @param {{
 *  seconds: Number
 *  nanoseconds: Number
 * }} props.endDate
 * @param {Array<String>} props.attachments
 */
const AdditionalInfoBlock = ({ id, description, endDate, attachments }) => {
  return (
    <div className="list__additional-info-container">
      <p className="list__additional-info-description">{ description }</p>
      <p className="list__additional-info-timestamp">{ endDate.seconds }</p>
      <div className="list__additional-info-attachments">
        <h2 className="list__additional-info-attachements-header">Attached files:</h2>
        <ul className="list__additional-info-attachments-list">
          { attachments.map((attachment, index) => <AttachmentItem key={`attachment-${index}-${id}`} attachment={attachment} />) }
        </ul>
      </div>
    </div>
  );
};

export default AdditionalInfoBlock;