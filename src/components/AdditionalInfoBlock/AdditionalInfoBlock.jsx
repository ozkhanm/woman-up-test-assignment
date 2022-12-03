const AttachmentItem = ({ attachment }) => {
  return (
    <li>
      { attachment }
    </li>
  );
};

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