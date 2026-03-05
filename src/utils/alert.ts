import { Platform, Alert as RNAlert } from 'react-native';

type AlertButton = {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
};

export function alert(title: string, message?: string, buttons?: AlertButton[]) {
  if (Platform.OS === 'web') {
    if (buttons && buttons.length > 1) {
      const result = window.confirm([title, message].filter(Boolean).join('\n'));
      if (result) {
        const confirmButton = buttons.find((b) => b.style !== 'cancel');
        confirmButton?.onPress?.();
      } else {
        const cancelButton = buttons.find((b) => b.style === 'cancel');
        cancelButton?.onPress?.();
      }
    } else {
      window.alert([title, message].filter(Boolean).join('\n'));
      buttons?.[0]?.onPress?.();
    }
  } else {
    RNAlert.alert(title, message, buttons);
  }
}
