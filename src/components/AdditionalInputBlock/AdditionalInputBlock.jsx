import dayjs from "dayjs";

import { TASK_FIELDS } from "../../constants";

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
 * 
 * @param {Object} props
 * @param {Task} props.taskData
 * @param {Function} props.inputChangeHandler
 */
const AdditionalInputBlock = ({ taskData, inputChangeHandler }) => {
  const { description, endDate, attachments } = taskData;
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
          type="file" id="main-file-input"
          multiple
          onChange={e => inputChangeHandler(e, TASK_FIELDS.ATTACHMENTS)}
        />
      </label>
    </div>
  );
};

export default AdditionalInputBlock;