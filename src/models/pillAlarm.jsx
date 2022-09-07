import "./css/pill.css"
import AlarmOption from './components/AlarmOption/AlarmOption';
import AnalogClock from './components/AnalogClock/AnalogClock';
import ContextAlarm from './components/context/ContextAlarm';
import DigitalClock from './components/DigitalClock/DigitalClock';

function pillAlarm() {

  return (
    <section className="clock container">
      <div className="clock__container grid">
        <div className="clock__content grid">
          <ContextAlarm>
            <AnalogClock />
            <DigitalClock />
            <AlarmOption />
          </ContextAlarm>
        </div>
      </div>
    </section>
  );
}

export default pillAlarm;
