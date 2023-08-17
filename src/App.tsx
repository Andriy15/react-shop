import { I18nProvider } from "@lingui/react";
import Router from "./pages/Router";
import { messages as enMessages } from "./locales/en/messages"
import { messages as ukMessages} from "./locales/uk/messages"
import { i18n } from "@lingui/core";
import { readItemFromStorage } from "./feature/utils/handleStorage";

function App() {
  i18n.load({
    en: enMessages, 
    uk: ukMessages, 
  });
  i18n.activate(readItemFromStorage("language") || "en")

  return (
    <I18nProvider i18n={i18n}>
      <Router />
    </I18nProvider>
  );
}

export default App
