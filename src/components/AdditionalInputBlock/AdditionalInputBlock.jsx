import dayjs from "dayjs";

import { TASK_FIELDS } from "../../constants";
import { getRandomId } from "../../utils";

/**
 * @typedef {{
 * title: String
 * description: String
 * endDate: Number
 * attachments: Array<String>
 * isFinished: Boolean
 * }} Task
 */

/**
 * @param {Object} props
 * @param {Task} props.taskData
 * @param {String[]} props.localUrls
 * @param {Function} props.inputChangeHandler
 * @param {Function} props.removeImageButtonClickHandler
 */
const AdditionalInputBlock = ({ taskData, localUrls, inputChangeHandler, removeImageButtonClickHandler }) => {
  const { description, endDate } = taskData;
  const date = dayjs(endDate).format("YYYY-MM-DD");

  return (
    <div className="form__additional-input-container">
      <textarea
        className="form__description-input"
        placeholder="Task description"
        value={description}
        onChange={e => inputChangeHandler(e, TASK_FIELDS.DESCRIPTION)}
      />
      <input className="form__date-input"
        type="date"
        value={date}
        onChange={e => inputChangeHandler(e, TASK_FIELDS.END_DATE)}
        required
      />
      <label className="form__file-input-label" htmlFor="main-file-input">
        <input
          className="form__file-input visually-hidden"
          type="file"
          id="main-file-input"
          multiple
          onChange={e => inputChangeHandler(e, TASK_FIELDS.ATTACHMENTS)}
        />
      </label>
      <ul className="list__additional-info-attachments-list">
        { 
          localUrls.map((it, index) => {
            const randomId = getRandomId();

            return (
              <li key={randomId} className="attachment-item">
                <img className="attachment-item__image" src={it} alt="Attachment" />
                <button className="attachment-item__button" type="button" onClick={() => removeImageButtonClickHandler(index)}>x</button>
              </li>
            );
          })
        }   
      </ul>
    </div>
  );
};

export default AdditionalInputBlock;
