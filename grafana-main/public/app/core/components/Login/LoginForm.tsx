import { css } from '@emotion/css';
import { ReactElement, useId } from 'react';
import { useForm } from 'react-hook-form';

import { GrafanaTheme2 } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { t } from '@grafana/i18n';
import { Button, Input, Field, useStyles2 } from '@grafana/ui';

import { PasswordField } from '../PasswordField/PasswordField';

import { FormModel } from './LoginCtrl';

interface Props {
  children: ReactElement;
  onSubmit: (data: FormModel) => void;
  isLoggingIn: boolean;
  passwordHint: string;
  loginHint: string;
}

export const LoginForm = ({ children, onSubmit, isLoggingIn, passwordHint, loginHint }: Props) => {
  const styles = useStyles2(getStyles);
  const usernameId = useId();
  const passwordId = useId();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormModel>({ mode: 'onChange' });

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          label={t('login.form.tendangnhap-label', 'Tên đăng nhập')}
          invalid={!!errors.user}
          error={errors.user?.message}
        >
          <Input
            {...register('user', { required: t('login.form.tendangnhap-required', 'Bắt buộc phải nhập tên đăng nhập') })}
            id={usernameId}
            autoFocus
            autoCapitalize="none"
            placeholder={loginHint || t('login.form.tendangnhap-placeholder', 'Nhập tên đăng nhập')}
            data-testid={selectors.pages.Login.username}
          />
        </Field>
        <Field
          label={t('login.form.matkhau-label', 'Mật khẩu')}
          invalid={!!errors.password}
          error={errors.password?.message}
        >
          <PasswordField
            {...register('password', { required: t('login.form.matkhau-required', 'Bắt buộc phải nhập mật khẩu') })}
            id={passwordId}
            autoComplete="current-password"
            placeholder={passwordHint || t('login.form.matkhau-placeholder', 'Nhập mật khẩu')}
          />
        </Field>
        <Button
          type="submit"
          data-testid={selectors.pages.Login.submit}
          className={styles.submitButton}
          disabled={isLoggingIn}
        >
          {isLoggingIn ? t('login.form.cho-dangnhap-label', 'Đang đăng nhập...') : t('login.form.dangnhap-label', 'Đăng nhập')}
        </Button>
        {children}
      </form>
    </div>
  );
};

export const getStyles = (theme: GrafanaTheme2) => {
  return {
    wrapper: css({
      width: '100%',
      paddingBottom: theme.spacing(2),
    }),

    submitButton: css({
      justifyContent: 'center',
      width: '100%',
    }),

    skipButton: css({
      alignSelf: 'flex-start',
    }),
  };
};
