import React, { useState } from 'react';

export default function MedicineReminder({ onSave }) {
  const [reminderTime, setReminderTime] = useState('00:00');

  const handleSaveReminder = () => {
    onSave(reminderTime);
    setReminderTime('');
  };

  return (
    <div>
      <input
        type="time"
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
        style={{borderRadius:'10px' ,backgroundColor:' #ffffcc'}}
      />
      <button className='btn btn-primary' style={{margin:'10px'}} onClick={handleSaveReminder}>Set Reminder</button>
    </div>
  );
}
