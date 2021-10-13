import React from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import { CustomProps } from "models";
import Icon from "./Icon";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

registerLocale("es", es);
setDefaultLocale("es");

const CustomInput = React.forwardRef<HTMLDivElement, CustomProps>(
  ({ color, value, text, onClick, hasError = undefined, placeholder='' }, ref) => (
    <div
      ref={ref}
      className={`container-datepicker ${color ? color : ""} ${hasError ? 'is-invalid' : 'is-valid'}`}
      onClick={onClick}
    >
      <input className="form-control" style={{border: 'none', backgroundColor: 'transparent'}} placeholder={placeholder} value={value || text || ''} />
      <Icon name="calendar" />
    </div>
  )
);

interface DateProps {
  inline?: boolean;
  required?: boolean;
  label?: string;
  labelClass?: string,
  color?: string | "";
  value?: Date;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  text?: string;
  onChange(
    date: Date | null,
    event: React.SyntheticEvent<any> | undefined
  ): void;
  onFocus?: () => void,
  onBlur?: () => void,
  hasError?: boolean,
  errorMessage?: string,
  highlightDates?: [];
  dateFormat?: string;
  showYearDropdown?: boolean
  showMonthDropdown?: boolean
  popperPlacement?: string;
  placeholder?: string
  labelColor?: string
}

const _DatePicker: React.FC<DateProps> = ({
  label,
  required = false,
  color,
  minDate,
  maxDate,
  value,
  disabled = false,
  text,
  onChange,
  onFocus,
  onBlur,
  hasError = undefined,
  errorMessage = 'Este campo es requerido',
  inline = false,
  highlightDates,
  dateFormat = 'dd-MM-yyyy',
  showYearDropdown = false,
  showMonthDropdown = false,
  popperPlacement = 'end',
  placeholder = '',
  labelColor = false,
  labelClass = ''
}) => (
  <div className="form-group">
    {label && (
      <label className={"label-datepicker "+(labelColor || 'text-white')+' '+labelClass}>
        {label} {required && <span className={'text-danger font-weight-bold'}>(*)</span>}
      </label>
    )}
    <DatePicker
      // highlightDates={highlightDates}
      inline={inline}
      minDate={minDate || null}
      maxDate={maxDate || null}
      onBlur={onBlur}
      onFocus={onFocus}
      dateFormat={dateFormat}
      selected={value || null}
      onChange={onChange}
      customInput={<CustomInput hasError={hasError} value={value} color={color} text={text} placeholder={placeholder} />}
      disabled={disabled}
      showYearDropdown={showYearDropdown}
      showMonthDropdown={showMonthDropdown}
      popperPlacement={popperPlacement}
      placeholderText={placeholder}
    />
    {
      hasError && (
        <div className="invalid-feedback">
            {errorMessage}
        </div>
      )
    }
  </div>
);

export default _DatePicker;
