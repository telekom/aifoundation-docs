import { useTranslation } from 'react-i18next';

export default function useMyI18n() {
    const { t, i18n } = useTranslation();
    return {
        t,
        locale: i18n.language,
        setLocale: (lng) => i18n.changeLanguage(lng),
    };
}
