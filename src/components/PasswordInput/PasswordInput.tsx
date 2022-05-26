import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import { ReactComponent as Visibility } from 'assets/icons/eye.svg';
import { ReactComponent as VisibilityOff } from 'assets/icons/eye-off.svg';
import { Control, Controller, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props<T> {
  control: Control<T>;
  name: Path<T>;
  required?: boolean;
  disabled?: boolean;
  isValidateRequired?: boolean;
  onChange?: (
    event?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

interface State {
  password: string;
  showPassword: boolean;
}
/**
 * @name should correspond to `password` key in your form type
 */
function PasswordInput<T>(props: Props<T>) {
  const {
    control,
    name,
    required,
    disabled,
    isValidateRequired,
    onChange: propOnChange,
  } = props;

  const { t } = useTranslation();

  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Controller
      control={control}
      name={name}
      {...(isValidateRequired
        ? {
            rules: {
              required: 'Password is required',
            },
          }
        : {})}
      render={({
        field: { onChange, onBlur, name, ref },
        fieldState: { error },
      }) => (
        <FormControl variant="outlined" required={required} disabled={disabled}>
          <InputLabel error={!!error} htmlFor="password">
            {t('Password')}
          </InputLabel>
          <OutlinedInput
            id="password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={(e) => {
              handleChange('password')(e);
              onChange(e);
              if (propOnChange) {
                propOnChange(e);
              }
            }}
            error={!!error}
            onBlur={onBlur}
            ref={ref}
            name={name}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText error={!!error}>
            {error?.message
              ? t(error.message, {
                  ns: 'validation',
                })
              : ''}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}

export default PasswordInput;
