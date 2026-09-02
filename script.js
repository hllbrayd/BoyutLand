/* ===== BoyutLand — script.js ====================================== */
'use strict';
document.addEventListener('DOMContentLoaded', () => {

// ════════════════════════════════════════════════════════════════════
//  TRANSLATIONS (i18n)
// ════════════════════════════════════════════════════════════════════
const LANGUAGES = [
  { code: 'tr', name: 'Türkçe', i18nKey: 'sz_t_rk_e',    native: 'Türkçe',        flag: '🇹🇷', dir: 'ltr' },
  { code: 'en', name: 'English', i18nKey: 'sz_english',   native: 'English',        flag: '🇬🇧', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', i18nKey: 'sz_arabic',    native: 'العربية',        flag: '🇸🇦', dir: 'rtl' },
  { code: 'es', name: 'Spanish', i18nKey: 'sz_spanish',   native: 'Español',        flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'French', i18nKey: 'sz_french',    native: 'Français',       flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'German', i18nKey: 'sz_german',    native: 'Deutsch',        flag: '🇩🇪', dir: 'ltr' },
  { code: 'ru', name: 'Russian', i18nKey: 'sz_russian',   native: 'Русский',        flag: '🇷🇺', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', i18nKey: 'sz_chinese',   native: '中文',            flag: '🇨🇳', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', i18nKey: 'sz_japanese',  native: '日本語',           flag: '🇯🇵', dir: 'ltr' },
  { code: 'hi', name: 'Hindi', i18nKey: 'sz_hindi',     native: 'हिन्दी',          flag: '🇮🇳', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', i18nKey: 'sz_portuguese',native: 'Português',      flag: '🇧🇷', dir: 'ltr' },
  { code: 'it', name: 'Italian', i18nKey: 'sz_italian',   native: 'Italiano',       flag: '🇮🇹', dir: 'ltr' },
  { code: 'ko', name: 'Korean', i18nKey: 'sz_korean',    native: '한국어',           flag: '🇰🇷', dir: 'ltr' },
  { code: 'nl', name: 'Dutch', i18nKey: 'sz_dutch',     native: 'Nederlands',     flag: '🇳🇱', dir: 'ltr' },
  { code: 'el', name: 'Greek', i18nKey: 'sz_greek',     native: 'Ελληνικά',       flag: '🇬🇷', dir: 'ltr' },
];

const T = {
  // ── UI strings ──────────────────────────────────────────────────
  tagline: {
    tr:'Akıllı Görsel Boyutlandırıcı', en:'Smart Image Resizer', ar:'أداة تغيير الحجم الذكية',
    es:'Redimensionador Inteligente',  fr:'Redimensionneur Intelligent', de:'Intelligenter Bildgrößenänderer',
    ru:'Умный Изменитель Размеров',    zh:'智能图片调整工具', ja:'スマート画像リサイザー',
    hi:'स्मार्ट इमेज रिसाइज़र',       pt:'Redimensionador Inteligente', it:'Ridimensionatore Intelligente',
    ko:'스마트 이미지 리사이저',         nl:'Slimme Afbeeldingsresizer', el:'Έξυπνο Εργαλείο Αλλαγής Μεγέθους'
  },
  privacy_badge: {
    tr:'Sunucusuz · Gizli', en:'Serverless · Private', ar:'بدون خادم · خاص',
    es:'Sin servidor · Privado', fr:'Sans serveur · Privé', de:'Serverlos · Privat',
    ru:'Без сервера · Приватно', zh:'无服务器 · 私密', ja:'サーバーレス · プライベート',
    hi:'सर्वरलेस · निजी', pt:'Sem servidor · Privado', it:'Senza server · Privato',
    ko:'서버리스 · 프라이빗', nl:'Serverloos · Privé', el:'Χωρίς διακομιστή · Ιδιωτικό'
  },
  hero_line1: {
    tr:'Görselinizi Tüm Platformlar İçin', en:'Resize Your Image For All Platforms',
    ar:'اضبط صورك لجميع المنصات',  es:'Redimensiona tu Imagen para Todas las Plataformas',
    fr:'Redimensionnez votre Image pour Toutes les Plateformes', de:'Passen Sie Ihr Bild für Alle Plattformen an',
    ru:'Измените размер изображения для всех платформ', zh:'为所有平台调整图片尺寸',
    ja:'すべてのプラットフォームに合わせて画像をリサイズ', hi:'सभी प्लेटफ़ॉर्म के लिए अपनी छवि का आकार बदलें',
    pt:'Redimensione sua Imagem para Todas as Plataformas', it:'Ridimensiona la tua Immagine per Tutte le Piattaforme',
    ko:'모든 플랫폼을 위해 이미지 크기 조정', nl:'Verklein uw Afbeelding voor Alle Platforms',
    el:'Αλλάξτε Μέγεθος Εικόνας για Όλες τις Πλατφόρμες'
  },
  hero_line2: {
    tr:'Saniyeler İçinde Boyutlandırın', en:'In Seconds, Without Quality Loss',
    ar:'في ثوانٍ بدون فقدان الجودة', es:'En Segundos, Sin Pérdida de Calidad',
    fr:'En Secondes, Sans Perte de Qualité', de:'In Sekunden, Ohne Qualitätsverlust',
    ru:'За секунды, без потери качества', zh:'几秒钟内，无质量损失',
    ja:'数秒で、品質を損なわずに', hi:'सेकंडों में, गुणवत्ता हानि के बिना',
    pt:'Em Segundos, Sem Perda de Qualidade', it:'In Secondi, Senza Perdita di Qualità',
    ko:'몇 초 안에, 품질 손실 없이', nl:'In Seconden, Zonder Kwaliteitsverlies',
    el:'Σε Δευτερόλεπτα, Χωρίς Απώλεια Ποιότητας'
  },
  hero_sub: {
    tr:'Kalite kaybı olmadan, en-boy oranını bozmadan akıllı kırpma. Tüm işlemler tarayıcınızda gerçekleşir.',
    en:'Smart cropping without quality loss or distortion. Everything happens in your browser.',
    ar:'قص ذكي بدون فقدان جودة. تتم جميع العمليات في متصفحك.',
    es:'Recorte inteligente sin pérdida de calidad. Todo ocurre en tu navegador.',
    fr:'Recadrage intelligent sans perte de qualité. Tout se passe dans votre navigateur.',
    de:'Intelligentes Zuschneiden ohne Qualitätsverlust. Alles passiert in Ihrem Browser.',
    ru:'Умная обрезка без потери качества. Всё происходит в вашем браузере.',
    zh:'智能裁剪，无质量损失。一切都在浏览器中完成。',
    ja:'品質を損なわないスマートクロップ。すべてブラウザ内で処理されます。',
    hi:'गुणवत्ता हानि के बिना स्मार्ट क्रॉपिंग। सब कुछ आपके ब्राउज़र में होता है।',
    pt:'Recorte inteligente sem perda de qualidade. Tudo acontece no seu navegador.',
    it:'Ritaglio intelligente senza perdita di qualità. Tutto avviene nel tuo browser.',
    ko:'품질 손실 없는 스마트 크롭. 모든 작업이 브라우저에서 이루어집니다.',
    nl:'Slim bijsnijden zonder kwaliteitsverlies. Alles gebeurt in uw browser.',
    el:'Έξυπνη περικοπή χωρίς απώλεια ποιότητας. Όλα γίνονται στο πρόγραμμα περιήγησής σας.'
  },
  drop_title: {
    tr:'Görseli buraya sürükleyin', en:'Drag your image here', ar:'اسحب صورتك هنا',
    es:'Arrastra tu imagen aquí', fr:'Faites glisser votre image ici', de:'Bild hierher ziehen',
    ru:'Перетащите изображение сюда', zh:'将图片拖放到这里', ja:'画像をここにドラッグ',
    hi:'यहाँ अपनी छवि खींचें', pt:'Arraste sua imagem aqui', it:'Trascina qui la tua immagine',
    ko:'여기로 이미지를 드래그하세요', nl:'Sleep uw afbeelding hier', el:'Σύρετε την εικόνα εδώ'
  },
  drop_or: {
    tr:'veya', en:'or', ar:'أو', es:'o', fr:'ou', de:'oder', ru:'или', zh:'或', ja:'または', hi:'या', pt:'ou', it:'o', ko:'또는', nl:'of', el:'ή'
  },
  drop_click: {
    tr:'dosya seçmek için tıklayın', en:'click to select a file', ar:'انقر لتحديد ملف',
    es:'haz clic para seleccionar', fr:'cliquez pour sélectionner', de:'zum Auswählen klicken',
    ru:'нажмите для выбора файла', zh:'点击选择文件', ja:'クリックしてファイルを選択',
    hi:'फ़ाइल चुनने के लिए क्लिक करें', pt:'clique para selecionar', it:'clicca per selezionare',
    ko:'파일 선택을 위해 클릭', nl:'klik om een bestand te kiezen', el:'κλικ για επιλογή αρχείου'
  },
  drop_release: {
    tr:'Bırakın!', en:'Release!', ar:'أفلت!', es:'¡Suelta!', fr:'Lâchez!', de:'Loslassen!',
    ru:'Отпустите!', zh:'松开！', ja:'ここで放して！', hi:'छोड़ें!', pt:'Solte!', it:'Rilascia!',
    ko:'놓으세요!', nl:'Loslaten!', el:'Αφήστε!'
  },
  preview_title: {
    tr:'Önizleme', en:'Preview', ar:'معاينة', es:'Vista Previa', fr:'Aperçu', de:'Vorschau',
    ru:'Предпросмотр', zh:'预览', ja:'プレビュー', hi:'पूर्वावलोकन', pt:'Visualização',
    it:'Anteprima', ko:'미리보기', nl:'Voorbeeld', el:'Προεπισκόπηση'
  },
  change_image: {
    tr:'Değiştir', en:'Change', ar:'تغيير', es:'Cambiar', fr:'Changer', de:'Ändern',
    ru:'Изменить', zh:'更换', ja:'変更', hi:'बदलें', pt:'Alterar', it:'Cambia',
    ko:'변경', nl:'Wijzigen', el:'Αλλαγή'
  },
  info_filename: {
    tr:'Dosya adı', en:'Filename', ar:'اسم الملف', es:'Nombre', fr:'Nom du fichier',
    de:'Dateiname', ru:'Имя файла', zh:'文件名', ja:'ファイル名', hi:'फ़ाइल नाम',
    pt:'Nome do arquivo', it:'Nome file', ko:'파일명', nl:'Bestandsnaam', el:'Όνομα αρχείου'
  },
  info_dims: {
    tr:'Boyut', en:'Dimensions', ar:'الأبعاد', es:'Dimensiones', fr:'Dimensions',
    de:'Abmessungen', ru:'Размеры', zh:'尺寸', ja:'サイズ', hi:'आयाम',
    pt:'Dimensões', it:'Dimensioni', ko:'크기', nl:'Afmetingen', el:'Διαστάσεις'
  },
  info_filesize: {
    tr:'Dosya boyutu', en:'File size', ar:'حجم الملف', es:'Tamaño', fr:'Taille du fichier',
    de:'Dateigröße', ru:'Размер файла', zh:'文件大小', ja:'ファイルサイズ', hi:'फ़ाइल साइज़',
    pt:'Tamanho do arquivo', it:'Dimensione file', ko:'파일 크기', nl:'Bestandsgrootte', el:'Μέγεθος αρχείου'
  },
  convert_btn: {
    tr:'Seçilenleri Dönüştür ve İndir', en:'Convert & Download Selected',
    ar:'تحويل وتنزيل المحدد', es:'Convertir y Descargar Seleccionados',
    fr:'Convertir et Télécharger', de:'Ausgewählte Konvertieren & Herunterladen',
    ru:'Конвертировать и Скачать', zh:'转换并下载所选', ja:'変換してダウンロード',
    hi:'चयनित को कन्वर्ट और डाउनलोड करें', pt:'Converter e Baixar Selecionados',
    it:'Converti e Scarica Selezionati', ko:'선택 항목 변환 및 다운로드',
    nl:'Geselecteerde Converteren en Downloaden', el:'Μετατροπή & Λήψη Επιλεγμένων'
  },
  sizes_selected: {
    tr:'boyut seçildi', en:'size(s) selected', ar:'حجم محدد', es:'tamaño(s) seleccionado(s)',
    fr:'taille(s) sélectionnée(s)', de:'Größe(n) ausgewählt', ru:'размер(ов) выбрано',
    zh:'个尺寸已选择', ja:'サイズ選択済み', hi:'आकार चुने गए', pt:'tamanho(s) selecionado(s)',
    it:'dimensione/i selezionate', ko:'크기 선택됨', nl:'maat/maten geselecteerd', el:'μέγεθος επιλέχθηκε'
  },
  target_sizes: {
    tr:'Hedef Boyutlar', en:'Target Sizes', ar:'الأحجام المستهدفة', es:'Tamaños Objetivo',
    fr:'Tailles Cibles', de:'Zielgrößen', ru:'Целевые Размеры', zh:'目标尺寸', ja:'ターゲットサイズ',
    hi:'लक्षित आकार', pt:'Tamanhos Alvo', it:'Dimensioni Obiettivo', ko:'대상 크기',
    nl:'Doelafmetingen', el:'Μεγέθη Στόχου'
  },
  select_all: {
    tr:'Tümünü Seç', en:'Select All', ar:'اختر الكل', es:'Seleccionar Todo', fr:'Tout Sélectionner',
    de:'Alle Auswählen', ru:'Выбрать Все', zh:'全选', ja:'すべて選択', hi:'सभी चुनें',
    pt:'Selecionar Tudo', it:'Seleziona Tutto', ko:'모두 선택', nl:'Alles Selecteren', el:'Επιλογή Όλων'
  },
  clear_all: {
    tr:'Temizle', en:'Clear', ar:'مسح', es:'Limpiar', fr:'Effacer', de:'Löschen',
    ru:'Очистить', zh:'清除', ja:'クリア', hi:'साफ़ करें', pt:'Limpar', it:'Cancella',
    ko:'지우기', nl:'Wissen', el:'Εκκαθάριση'
  },
  custom_size_title: {
    tr:'Serbest Boyut (Custom Size)', en:'Custom Size', ar:'حجم مخصص', es:'Tamaño Personalizado',
    fr:'Taille Personnalisée', de:'Benutzerdefinierte Größe', ru:'Произвольный Размер',
    zh:'自定义尺寸', ja:'カスタムサイズ', hi:'कस्टम आकार', pt:'Tamanho Personalizado',
    it:'Dimensione Personalizzata', ko:'사용자 지정 크기', nl:'Aangepaste Afmeting', el:'Προσαρμοσμένο Μέγεθος'
  },
  custom_width: {
    tr:'Genişlik (px)', en:'Width (px)', ar:'العرض (بكسل)', es:'Ancho (px)', fr:'Largeur (px)',
    de:'Breite (px)', ru:'Ширина (пх)', zh:'宽度 (px)', ja:'幅 (px)', hi:'चौड़ाई (px)',
    pt:'Largura (px)', it:'Larghezza (px)', ko:'너비 (px)', nl:'Breedte (px)', el:'Πλάτος (px)'
  },
  custom_height: {
    tr:'Yükseklik (px)', en:'Height (px)', ar:'الارتفاع (بكسل)', es:'Alto (px)', fr:'Hauteur (px)',
    de:'Höhe (px)', ru:'Высота (пх)', zh:'高度 (px)', ja:'高さ (px)', hi:'ऊँचाई (px)',
    pt:'Altura (px)', it:'Altezza (px)', ko:'높이 (px)', nl:'Hoogte (px)', el:'Ύψος (px)'
  },
  add_to_list: {
    tr:'Listeye Ekle', en:'Add to List', ar:'أضف إلى القائمة', es:'Agregar a la Lista',
    fr:'Ajouter à la Liste', de:'Zur Liste Hinzufügen', ru:'Добавить в Список',
    zh:'添加到列表', ja:'リストに追加', hi:'सूची में जोड़ें', pt:'Adicionar à Lista',
    it:'Aggiungi alla Lista', ko:'목록에 추가', nl:'Toevoegen aan Lijst', el:'Προσθήκη στη Λίστα'
  },
  converting: {
    tr:'Dönüştürülüyor...', en:'Converting...', ar:'جاري التحويل...', es:'Convirtiendo...',
    fr:'Conversion en cours...', de:'Konvertiere...', ru:'Конвертирую...', zh:'转换中...',
    ja:'変換中...', hi:'कन्वर्ट हो रहा है...', pt:'Convertendo...', it:'Convertendo...',
    ko:'변환 중...', nl:'Converteren...', el:'Μετατροπή...'
  },
  crop_modal_title: {
    tr:'Kırpma Alanını Ayarla', en:'Adjust Crop Area', ar:'ضبط منطقة القص',
    es:'Ajustar Área de Recorte', fr:'Ajuster la Zone de Recadrage', de:'Zuschneidebereich Anpassen',
    ru:'Настроить Область Обрезки', zh:'调整裁剪区域', ja:'トリミング領域を調整', hi:'क्रॉप क्षेत्र समायोजित करें',
    pt:'Ajustar Área de Corte', it:'Regola Area di Ritaglio', ko:'자르기 영역 조정',
    nl:'Bijsnijdgebied Aanpassen', el:'Ρύθμιση Περιοχής Περικοπής'
  },
  crop_hint: {
    tr:'Kutuyu sürükleyerek kırpma alanını ayarlayın.', en:'Drag the box to set the crop area.',
    ar:'اسحب المربع لضبط منطقة القص.', es:'Arrastra el recuadro para definir el área de recorte.',
    fr:'Faites glisser la boîte pour définir la zone de recadrage.',
    de:'Ziehen Sie das Feld, um den Zuschneidebereich festzulegen.',
    ru:'Перетащите поле для настройки области обрезки.', zh:'拖动框设置裁剪区域。',
    ja:'ボックスをドラッグしてトリミング領域を設定してください。',
    hi:'क्रॉप क्षेत्र सेट करने के लिए बॉक्स खींचें।', pt:'Arraste a caixa para definir a área de corte.',
    it:'Trascina la casella per impostare l\'area di ritaglio.',
    ko:'상자를 드래그하여 자르기 영역을 설정하세요.', nl:'Sleep het vak om het bijsnijdgebied in te stellen.',
    el:'Σύρετε το πλαίσιο για να ορίσετε την περιοχή περικοπής.'
  },
  crop_reset: {
    tr:'Sıfırla', en:'Reset', ar:'إعادة تعيين', es:'Restablecer', fr:'Réinitialiser',
    de:'Zurücksetzen', ru:'Сбросить', zh:'重置', ja:'リセット', hi:'रीसेट करें',
    pt:'Redefinir', it:'Ripristina', ko:'초기화', nl:'Herstellen', el:'Επαναφορά'
  },
  crop_confirm: {
    tr:'Kırpma Alanını Onayla', en:'Confirm Crop Area', ar:'تأكيد منطقة القص',
    es:'Confirmar Área de Recorte', fr:'Confirmer le Recadrage', de:'Zuschneidebereich Bestätigen',
    ru:'Подтвердить Область Обрезки', zh:'确认裁剪区域', ja:'トリミング領域を確定',
    hi:'क्रॉप क्षेत्र की पुष्टि करें', pt:'Confirmar Área de Corte',
    it:'Conferma Area di Ritaglio', ko:'자르기 영역 확인',
    nl:'Bijsnijdgebied Bevestigen', el:'Επιβεβαίωση Περιοχής Περικοπής'
  },
  feat1_title: {
    tr:'%100 Gizli', en:'100% Private', ar:'خصوصية تامة', es:'100% Privado', fr:'100% Privé',
    de:'100% Privat', ru:'100% Приватно', zh:'完全隐私', ja:'完全プライベート', hi:'100% निजी',
    pt:'100% Privado', it:'100% Privato', ko:'100% 비공개', nl:'100% Privé', el:'100% Ιδιωτικό'
  },
  feat1_desc: {
    tr:'Görseliniz hiçbir sunucuya yüklenmez. Tüm işlem tarayıcınızda gerçekleşir.',
    en:'Your image is never uploaded to any server. Everything runs in your browser.',
    ar:'لا يتم رفع صورتك إلى أي خادم. كل شيء يعمل في متصفحك.',
    es:'Tu imagen nunca se sube a ningún servidor. Todo funciona en tu navegador.',
    fr:"Votre image n'est jamais téléchargée sur un serveur. Tout fonctionne dans votre navigateur.",
    de:'Ihr Bild wird niemals auf einen Server hochgeladen. Alles läuft in Ihrem Browser.',
    ru:'Ваше изображение никогда не загружается на сервер. Всё работает в браузере.',
    zh:'您的图片不会上传到任何服务器。所有操作都在浏览器中运行。',
    ja:'画像はいかなるサーバーにもアップロードされません。すべてブラウザで実行されます。',
    hi:'आपकी छवि किसी भी सर्वर पर अपलोड नहीं होती। सब कुछ आपके ब्राउज़र में चलता है।',
    pt:'Sua imagem nunca é enviada a nenhum servidor. Tudo funciona no seu navegador.',
    it:"La tua immagine non viene mai caricata su nessun server. Tutto funziona nel tuo browser.",
    ko:'이미지는 어떤 서버에도 업로드되지 않습니다. 모든 것이 브라우저에서 실행됩니다.',
    nl:'Uw afbeelding wordt nooit naar een server geüpload. Alles werkt in uw browser.',
    el:'Η εικόνα σας δεν ανεβαίνει ποτέ σε κανέναν διακομιστή. Όλα εκτελούνται στο πρόγραμμα περιήγησής σας.'
  },
  feat2_title: {
    tr:'Akıllı Kırpma', en:'Smart Crop', ar:'قص ذكي', es:'Recorte Inteligente',
    fr:'Recadrage Intelligent', de:'Intelligentes Zuschneiden', ru:'Умная Обрезка',
    zh:'智能裁剪', ja:'スマートクロップ', hi:'स्मार्ट क्रॉप', pt:'Corte Inteligente',
    it:'Ritaglio Intelligente', ko:'스마트 크롭', nl:'Slim Bijsnijden', el:'Έξυπνη Περικοπή'
  },
  feat2_desc: {
    tr:'Manuel veya otomatik merkez kırpma. Görseliniz hiç eğrilmez.',
    en:'Manual or automatic center crop. Your image never gets distorted.',
    ar:'قص يدوي أو تلقائي من المركز. صورتك لن تتشوه أبدًا.',
    es:'Recorte manual o automático desde el centro. Tu imagen nunca se distorsiona.',
    fr:'Recadrage manuel ou automatique depuis le centre. Votre image ne sera jamais déformée.',
    de:'Manuelles oder automatisches Zuschneiden von der Mitte. Ihr Bild wird nie verzerrt.',
    ru:'Ручная или автоматическая центральная обрезка. Изображение никогда не искажается.',
    zh:'手动或自动居中裁剪。您的图片永远不会变形。', ja:'手動または自動のセンタークロップ。画像が歪むことはありません。',
    hi:'मैनुअल या स्वचालित केंद्र क्रॉप। आपकी छवि कभी विकृत नहीं होगी।',
    pt:'Corte manual ou automático do centro. Sua imagem nunca será distorcida.',
    it:'Ritaglio manuale o automatico dal centro. La tua immagine non verrà mai distorta.',
    ko:'수동 또는 자동 중앙 크롭. 이미지가 왜곡되지 않습니다.',
    nl:'Handmatig of automatisch bijsnijden vanuit het midden. Uw afbeelding wordt nooit vervormd.',
    el:'Χειροκίνητη ή αυτόματη κεντρική περικοπή. Η εικόνα σας δεν θα παραμορφωθεί ποτέ.'
  },
  feat3_title: {
    tr:'Toplu İndirme', en:'Bulk Download', ar:'تنزيل جماعي', es:'Descarga Masiva',
    fr:'Téléchargement en Masse', de:'Massendownload', ru:'Массовая Загрузка',
    zh:'批量下载', ja:'一括ダウンロード', hi:'बल्क डाउनलोड', pt:'Download em Massa',
    it:'Download in Blocco', ko:'일괄 다운로드', nl:'Bulk Download', el:'Μαζική Λήψη'
  },
  feat3_desc: {
    tr:'Tüm boyutlar tek bir .zip dosyasında toplanarak anında indirilir.',
    en:'All sizes are packaged into a single .zip file and downloaded instantly.',
    ar:'يتم تجميع جميع الأحجام في ملف .zip واحد وتنزيله فورًا.',
    es:'Todos los tamaños se empaquetan en un solo archivo .zip y se descargan al instante.',
    fr:'Toutes les tailles sont empaquetées dans un seul fichier .zip et téléchargées instantanément.',
    de:'Alle Größen werden in einer .zip-Datei zusammengefasst und sofort heruntergeladen.',
    ru:'Все размеры упаковываются в один .zip-файл и загружаются мгновенно.',
    zh:'所有尺寸打包成一个 .zip 文件立即下载。', ja:'すべてのサイズが1つの.zipファイルにまとめてダウンロードされます。',
    hi:'सभी आकार एक .zip फ़ाइल में पैक होकर तुरंत डाउनलोड होते हैं।',
    pt:'Todos os tamanhos são empacotados em um único arquivo .zip e baixados instantaneamente.',
    it:'Tutte le dimensioni vengono raccolte in un unico file .zip e scaricate istantaneamente.',
    ko:'모든 크기가 하나의 .zip 파일로 패키징되어 즉시 다운로드됩니다.',
    nl:'Alle maten worden verpakt in één .zip-bestand en direct gedownload.',
    el:'Όλα τα μεγέθη συσκευάζονται σε ένα .zip αρχείο και λαμβάνονται αμέσως.'
  },
  footer_text: {
    tr:'Tüm veriler tarayıcınızda işlenir. Hiçbir şey sunucuya gönderilmez.',
    en:'All data is processed in your browser. Nothing is sent to any server.',
    ar:'تتم معالجة جميع البيانات في متصفحك. لا شيء يُرسل إلى أي خادم.',
    es:'Todos los datos se procesan en tu navegador. Nada se envía a ningún servidor.',
    fr:'Toutes les données sont traitées dans votre navigateur. Rien n\'est envoyé à un serveur.',
    de:'Alle Daten werden in Ihrem Browser verarbeitet. Nichts wird an einen Server gesendet.',
    ru:'Все данные обрабатываются в вашем браузере. Ничего не отправляется на сервер.',
    zh:'所有数据都在您的浏览器中处理。没有任何内容发送到服务器。',
    ja:'すべてのデータはブラウザで処理されます。何もサーバーに送信されません。',
    hi:'सभी डेटा आपके ब्राउज़र में संसाधित होता है। कुछ भी सर्वर को नहीं भेजा जाता।',
    pt:'Todos os dados são processados no seu navegador. Nada é enviado a nenhum servidor.',
    it:'Tutti i dati vengono elaborati nel tuo browser. Nulla viene inviato a nessun server.',
    ko:'모든 데이터는 브라우저에서 처리됩니다. 어떤 것도 서버로 전송되지 않습니다.',
    nl:'Alle gegevens worden verwerkt in uw browser. Er wordt niets naar een server gestuurd.',
    el:'Όλα τα δεδομένα υποβάλλονται σε επεξεργασία στο πρόγραμμα περιήγησής σας. Τίποτα δεν στέλνεται σε κανέναν διακομιστή.'
  },
  confirm_reset: {
    tr:'Devam eden işlemleriniz kaybolacak. Ana sayfaya dönmek istediğinize emin misiniz?', en:'Ongoing processes will be lost. Are you sure you want to return to the homepage?', ar:'ستفقد العمليات الجارية. هل أنت متأكد أنك تريد العودة إلى الصفحة الرئيسية؟', es:'Los procesos en curso se perderán. ¿Estás seguro de que quieres volver a la página de inicio?', fr:'Les processus en cours seront perdus. Êtes-vous sûr de vouloir retourner à l\'accueil ?', de:'Laufende Prozesse gehen verloren. Sind Sie sicher, dass Sie zur Startseite zurückkehren möchten?', ru:'Текущие процессы будут потеряны. Вы уверены, что хотите вернуться на главную страницу?', zh:'正在进行的进程将会丢失。确定要返回主页吗？', ja:'進行中のプロセスは失われます。ホームページに戻ってもよろしいですか？', hi:'चल रही प्रक्रियाएं नष्ट हो जाएंगी। क्या आप सुनिश्चित हैं कि आप होमपेज पर वापस लौटना चाहते हैं?', pt:'Os processos em andamento serão perdidos. Tem certeza de que deseja voltar à página inicial?', it:'I processi in corso andranno persi. Sei sicuro di voler tornare alla homepage?', ko:'진행 중인 프로세스가 손실됩니다. 홈페이지로 돌아가시겠습니까?', nl:'Lopende processen gaan verloren. Weet u zeker dat u wilt terugkeren naar de startpagina?', el:'Οι τρέχουσες διαδικασίες θα χαθούν. Είστε σίγουροι ότι θέλετε να επιστρέψετε στην αρχική σελίδα;'
  },
  risk_msg: {
    tr:'Dikkat: Seçtiğiniz bazı boyutlar (kırmızı noktalı olanlar) orijinal görsele göre çok küçük veya aşırı dar/geniş olduğu için çıktıda piksellenme veya kırpma kayıpları yaşanabilir.',
    en:'Attention: Some selected sizes (marked with a red dot) are very small or have extreme aspect ratios compared to the original image, which may cause pixelation or cropping losses in the output.',
    ar:'تنبيه: بعض الأحجام المحددة (المميزة بنقطة حمراء) صغيرة جدًا أو لها نسب عرض إلى ارتفاع قصوى، مما قد يؤدي إلى فقدان البكسل أو القص في المخرجات.',
    es:'Atención: Algunos tamaños seleccionados (marcados con un punto rojo) son muy pequeños o tienen proporciones extremas, lo que puede causar pixelación o pérdidas de recorte en la salida.',
    fr:'Attention : Certaines tailles sélectionnées (marquées d\'un point rouge) sont très petites ou ont des proportions extrêmes, ce qui peut entraîner une pixellisation ou des pertes de recadrage.',
    de:'Achtung: Einige ausgewählte Größen (mit rotem Punkt markiert) sind sehr klein oder haben extreme Seitenverhältnisse, was zu Verpixelung oder Schnittverlusten führen kann.',
    ru:'Внимание: Некоторые выбранные размеры (отмеченные красной точкой) очень малы или имеют экстремальные пропорции, что может привести к пикселизации или потерям при обрезке.',
    zh:'注意：一些选定的尺寸（带有红点）非常小或具有极端的宽高比，这可能导致输出中的像素化或裁剪损失。',
    ja:'注意：選択した一部のサイズ（赤い点が付いているもの）は、元の画像に比べて非常に小さいか極端なアスペクト比であるため、出力でピクセル化や切り取りによる損失が発生する可能性があります。',
    hi:'ध्यान दें: कुछ चयनित आकार (लाल बिंदु के साथ चिह्नित) बहुत छोटे हैं या उनके पहलू अनुपात अत्यधिक हैं, जिससे आउटपुट में पिक्सेलेशन या क्रॉपिंग हानि हो सकती है।',
    pt:'Atenção: Alguns tamanhos selecionados (marcados com um ponto vermelho) são muito pequenos ou possuem proporções extremas, o que pode causar pixelização ou perdas de corte na saída.',
    it:'Attenzione: Alcune dimensioni selezionate (contrassegnate con un punto rosso) sono molto piccole o presentano proporzioni estreme, il che potrebbe causare perdite per pixelizzazione o ritaglio nell\'output.',
    ko:'주의 : 선택한 일부 크기(빨간 점으로 표시됨)가 원본 이미지에 비해 너무 작거나 극단적인 종횡비를 가져 출력 시 픽셀화 또는 자르기 손실이 발생할 수 있습니다.',
    nl:'Let op: Sommige geselecteerde maten (gemarkeerd met een rode stip) zijn erg klein of hebben extreme beeldverhoudingen, wat kan leiden tot pixelvorming of snijverliezen in de uitvoer.',
    el:'Προσοχή: Ορισμένα επιλεγμένα μεγέθη (με κόκκινη κουκκίδα) είναι πολύ μικρά ή έχουν ακραίες αναλογίες, γεγονός που μπορεί να προκαλέσει απώλειες.'
  },
  feat1_title: {
    tr:'%100 Güvenli', en:'100% Secure', ar:'100% آمن', es:'100% Seguro', fr:'100% Sécurisé', de:'100% Sicher', ru:'100% Безопасно', zh:'100% 安全', ja:'100% 安全', hi:'100% सुरक्षित', pt:'100% Seguro', it:'100% Sicuro', ko:'100% 안전', nl:'100% Veilig', el:'100% Ασφαλές'
  },
  feat1_desc: {
    tr:'Fotoğraflarınız cihazınızdan dışarı çıkmaz, kimse göremez.', en:'Your photos never leave your device, nobody can see them.', ar:'صورك لا تغادر جهازك أبداً، لا أحد يستطيع رؤيتها.', es:'Tus fotos nunca salen de tu dispositivo, nadie puede verlas.', fr:'Vos photos ne quittent jamais votre appareil, personne ne peut les voir.', de:'Ihre Fotos verlassen niemals Ihr Gerät, niemand kann sie sehen.', ru:'Ваши фотографии никогда не покидают ваше устройство, их никто не увидит.', zh:'您的照片绝不会离开您的设备，没有人能看到它们。', ja:'写真はデバイスから出ず、誰にも見られません。', hi:'आपकी तस्वीरें आपके डिवाइस से कभी बाहर नहीं जातीं, उन्हें कोई नहीं देख सकता।', pt:'Suas fotos nunca saem do seu dispositivo, ninguém pode vê-las.', it:'Le tue foto non lasciano mai il tuo dispositivo, nessuno può vederle.', ko:'사진은 기기를 벗어나지 않으며, 아무도 볼 수 없습니다.', nl:'Je foto\'s verlaten je apparaat nooit, niemand kan ze zien.', el:'Οι φωτογραφίες σας δεν εγκαταλείπουν ποτέ τη συσκευή σας, κανείς δεν μπορεί να τις δει.'
  },
  feat2_title: {
    tr:'HD Kalite', en:'HD Quality', ar:'جودة HD', es:'Calidad HD', fr:'Qualité HD', de:'HD Qualität', ru:'HD Качество', zh:'高清画质', ja:'HD 品質', hi:'HD गुणवत्ता', pt:'Qualidade HD', it:'Qualità HD', ko:'HD 화질', nl:'HD Kwaliteit', el:'Ποιότητα HD'
  },
  feat2_desc: {
    tr:'Küçültme veya büyütme yaparken fotoğraflarınızın netliği asla bozulmaz.', en:'Your photos never lose clarity when scaling down or up.', ar:'لا تفقد صورك وضوحها أبدًا عند التصغير أو التكبير.', es:'Tus fotos nunca pierden claridad al reducir o ampliar.', fr:'Vos photos ne perdent jamais de netteté lors de la réduction ou de l\'agrandissement.', de:'Ihre Fotos verlieren beim Verkleinern oder Vergrößern nie an Klarheit.', ru:'Ваши фотографии никогда не теряют четкости при уменьшении или увеличении.', zh:'在缩小或放大时，您的照片永远不会失去清晰度。', ja:'拡大や縮小を行っても、写真の鮮明さが失われることはありません。', hi:'स्केलिंग करते समय आपकी तस्वीरें कभी स्पष्टता नहीं खोतीं।', pt:'Suas fotos nunca perdem a clareza ao reduzir ou ampliar.', it:'Le tue foto non perdono mai nitidezza durante il ridimensionamento.', ko:'축소나 확대 시 사진의 선명도를 잃지 않습니다.', nl:'Uw foto\'s verliezen nooit hun helderheid bij het verkleinen of vergroten.', el:'Οι φωτογραφίες σας δεν χάνουν ποτέ την καθαρότητά τους κατά τη σμίκρυνση ή τη μεγέθυνση.'
  },
  feat3_title: {
    tr:'Onlarca Hazır Boyut', en:'Dozens of Presets', ar:'عشرات الإعدادات المسبقة', es:'Docenas de Ajustes Preestablecidos', fr:'Des dizaines de Préréglages', de:'Dutzende Voreinstellungen', ru:'Десятки пресетов', zh:'数十种预设尺寸', ja:'多数のプリセット', hi:'दर्जनों प्रीसेट', pt:'Dezenas de Predefinições', it:'Decine di Preimpostazioni', ko:'수십 개의 프리셋', nl:'Tientallen Voorinstellingen', el:'Δεκάδες Προεπιλογές'
  },
  feat3_desc: {
    tr:'Tüm sosyal medya platformları ve baskı ölçüleri tek tıkla elinizin altında.', en:'All social media platforms and print sizes at your fingertips with one click.', ar:'جميع منصات وسائل التواصل الاجتماعي وأحجام الطباعة في متناول يدك بنقرة واحدة.', es:'Todas las plataformas sociales y tamaños de impresión al alcance de tu mano con un clic.', fr:'Toutes les plateformes sociales et tailles d\'impression à portée de main en un clic.', de:'Alle Social-Media-Plattformen und Druckgrößen mit einem Klick zur Hand.', ru:'Все социальные сети и размеры для печати под рукой в один клик.', zh:'一键获取所有社交媒体平台和打印尺寸。', ja:'すべてのソーシャルメディアや印刷サイズをワンクリックで。', hi:'सभी सोशल मीडिया प्लेटफ़ॉर्म और प्रिंट आकार एक क्लिक के साथ।', pt:'Todas as plataformas sociais e tamanhos de impressão na ponta dos dedos com um clique.', it:'Tutte le piattaforme social e i formati di stampa a portata di mano con un clic.', ko:'단 한 번의 클릭으로 모든 소셜 미디어 플랫폼과 인쇄 크기를 이용할 수 있습니다.', nl:'Alle sociale media en afdrukformaten binnen handbereik met één klik.', el:'Όλες οι πλατφόρμες κοινωνικών μέσων και τα μεγέθη εκτύπωσης στα χέρια σας με ένα κλικ.'
  },
  feat4_title: {
    tr:'Akıllı Kırpma', en:'Smart Crop', ar:'قص ذكي', es:'Recorte Inteligente', fr:'Recadrage Intelligent', de:'Intelligentes Zuschneiden', ru:'Умная Обрезка', zh:'智能裁剪', ja:'スマートクロップ', hi:'स्मार्ट क्रॉप', pt:'Corte Inteligente', it:'Ritaglio Intelligente', ko:'스마트 크롭', nl:'Slim Bijsnijden', el:'Έξυπνη Περικοπή'
  },
  feat4_desc: {
    tr:'Fotoğrafın neresini kullanmak istiyorsanız o alanı özgürce seçin.', en:'Freely select the area of the photo you want to use.', ar:'حدد بحرية منطقة الصورة التي تريد استخدامها.', es:'Selecciona libremente el área de la foto que deseas usar.', fr:'Sélectionnez librement la zone de la photo que vous souhaitez utiliser.', de:'Wählen Sie frei den Bereich des Fotos, den Sie verwenden möchten.', ru:'Свободно выбирайте область фотографии, которую хотите использовать.', zh:'自由选择您想要使用的照片区域。', ja:'使用したい写真の領域を自由に選択してください。', hi:'आप जिस फोटो क्षेत्र का उपयोग करना चाहते हैं, उसे स्वतंत्र रूप से चुनें।', pt:'Selecione livremente a área da foto que deseja usar.', it:'Seleziona liberamente l\'area della foto che desideri utilizzare.', ko:'사용하려는 사진의 영역을 자유롭게 선택하세요.', nl:'Selecteer vrij het gebied van de foto dat u wilt gebruiken.', el:'Επιλέξτε ελεύθερα την περιοχή της φωτογραφίας που θέλετε να χρησιμοποιήσετε.'
  },

  // Error / info messages
  err_no_image:     { tr:'Lütfen önce bir görsel yükleyin.', en:'Please upload an image first.', ar:'يرجى تحميل صورة أولاً.', es:'Por favor, sube una imagen primero.', fr:'Veuillez d\'abord télécharger une image.', de:'Bitte laden Sie zuerst ein Bild hoch.', ru:'Пожалуйста, сначала загрузите изображение.', zh:'请先上传图片。', ja:'最初に画像をアップロードしてください。', hi:'कृपया पहले एक छवि अपलोड करें।', pt:'Por favor, faça upload de uma imagem primeiro.', it:'Si prega di caricare prima un\'immagine.', ko:'먼저 이미지를 업로드하세요.', nl:'Upload eerst een afbeelding.', el:'Παρακαλώ ανεβάστε πρώτα μια εικόνα.' },
  err_no_selection: { tr:'Lütfen en az bir boyut seçin.', en:'Please select at least one size.', ar:'يرجى اختيار حجم واحد على الأقل.', es:'Por favor, selecciona al menos un tamaño.', fr:'Veuillez sélectionner au moins une taille.', de:'Bitte wählen Sie mindestens eine Größe aus.', ru:'Пожалуйста, выберите хотя бы один размер.', zh:'请至少选择一个尺寸。', ja:'少なくとも1つのサイズを選択してください。', hi:'कृपया कम से कम एक आकार चुनें।', pt:'Selecione pelo menos um tamanho.', it:'Seleziona almeno una dimensione.', ko:'하나 이상의 크기를 선택하세요.', nl:'Selecteer ten minste één maat.', el:'Παρακαλώ επιλέξτε τουλάχιστον ένα μέγεθος.' },
  err_invalid_file: { tr:'Lütfen geçerli bir görsel dosyası seçin (JPG, PNG, WebP).', en:'Please select a valid image file (JPG, PNG, WebP).', ar:'يرجى اختيار ملف صورة صحيح (JPG, PNG, WebP).', es:'Selecciona un archivo de imagen válido (JPG, PNG, WebP).', fr:'Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).', de:'Bitte wählen Sie eine gültige Bilddatei (JPG, PNG, WebP).', ru:'Выберите допустимый файл изображения (JPG, PNG, WebP).', zh:'请选择有效的图片文件（JPG、PNG、WebP）。', ja:'有効な画像ファイル（JPG、PNG、WebP）を選択してください。', hi:'कृपया एक वैध छवि फ़ाइल चुनें (JPG, PNG, WebP)।', pt:'Selecione um arquivo de imagem válido (JPG, PNG, WebP).', it:'Seleziona un file immagine valido (JPG, PNG, WebP).', ko:'올바른 이미지 파일을 선택하세요 (JPG, PNG, WebP).', nl:'Selecteer een geldig afbeeldingsbestand (JPG, PNG, WebP).', el:'Επιλέξτε έγκυρο αρχείο εικόνας (JPG, PNG, WebP).' },
  err_file_size:    { tr:'Dosya boyutu 50 MB limitini aşıyor.', en:'File size exceeds the 50 MB limit.', ar:'حجم الملف يتجاوز الحد المسموح به (50 ميغابايت).', es:'El tamaño del archivo supera el límite de 50 MB.', fr:'La taille du fichier dépasse la limite de 50 Mo.', de:'Die Dateigröße überschreitet das 50-MB-Limit.', ru:'Размер файла превышает лимит в 50 МБ.', zh:'文件大小超过50MB限制。', ja:'ファイルサイズが50MBの上限を超えています。', hi:'फ़ाइल का आकार 50 MB सीमा से अधिक है।', pt:'O tamanho do arquivo excede o limite de 50 MB.', it:'La dimensione del file supera il limite di 50 MB.', ko:'파일 크기가 50MB 제한을 초과합니다.', nl:'Bestandsgrootte overschrijdt de 50 MB-limiet.', el:'Το μέγεθος αρχείου υπερβαίνει το όριο των 50 MB.' },
  err_custom_vals:  { tr:'Lütfen geçerli genişlik ve yükseklik değerlerini girin (1–20000 px).', en:'Please enter valid width and height values (1–20000 px).', ar:'يرجى إدخال قيم صحيحة للعرض والارتفاع (1–20000 بكسل).', es:'Ingresa valores válidos de ancho y alto (1–20000 px).', fr:'Entrez des valeurs valides de largeur et hauteur (1–20000 px).', de:'Geben Sie gültige Breiten- und Höhenwerte ein (1–20000 px).', ru:'Введите допустимые значения ширины и высоты (1–20000 пх).', zh:'请输入有效的宽度和高度值（1–20000 px）。', ja:'有効な幅と高さの値を入力してください（1–20000 px）。', hi:'कृपया मान्य चौड़ाई और ऊँचाई मान दर्ज करें (1–20000 px)।', pt:'Insira valores válidos de largura e altura (1–20000 px).', it:'Inserisci valori validi di larghezza e altezza (1–20000 px).', ko:'유효한 너비와 높이 값을 입력하세요 (1–20000 px).', nl:'Voer geldige breedte- en hoogtewaarden in (1–20000 px).', el:'Εισάγετε έγκυρες τιμές πλάτους και ύψους (1–20000 px).' },
  err_duplicate:    { tr:'Bu boyut zaten listede mevcut.', en:'This size is already in the list.', ar:'هذا الحجم موجود بالفعل في القائمة.', es:'Este tamaño ya está en la lista.', fr:'Cette taille est déjà dans la liste.', de:'Diese Größe ist bereits in der Liste.', ru:'Этот размер уже есть в списке.', zh:'该尺寸已在列表中。', ja:'このサイズはすでにリストにあります。', hi:'यह आकार पहले से सूची में है।', pt:'Este tamanho já está na lista.', it:'Questa dimensione è già nell\'elenco.', ko:'이 크기는 이미 목록에 있습니다.', nl:'Dit formaat staat al in de lijst.', el:'Αυτό το μέγεθος υπάρχει ήδη στη λίστα.' },
  risk_warning:     { tr:'Bu ölçü, fotoğrafınızın orijinal oranını değiştirebilir. En kusursuz sonuç için kırpma alanını manuel ayarlamanızı tavsiye ederiz.', en:'This size may alter your photo\'s original aspect ratio. For the best result, we recommend adjusting the crop area manually.', ar:'قد يغير هذا الحجم نسبة الصورة الأصلية. للحصول على أفضل نتيجة، نوصي بضبط منطقة القص يدويًا.', es:'Este tamaño puede alterar la proporción original de tu foto. Para el mejor resultado, recomendamos ajustar el área de recorte manualmente.', fr:'Cette taille peut modifier les proportions originales de votre photo. Pour un résultat optimal, nous recommandons d\'ajuster la zone de recadrage manuellement.', de:'Diese Größe kann das ursprüngliche Seitenverhältnis Ihres Fotos verändern. Für das beste Ergebnis empfehlen wir, den Zuschneidebereich manuell anzupassen.', ru:'Этот размер может изменить исходное соотношение сторон вашего фото. Для наилучшего результата рекомендуем вручную настроить область кадрирования.', zh:'此尺寸可能会改变照片的原始比例。为获得最佳效果，建议手动调整裁剪区域。', ja:'このサイズは写真の元のアスペクト比を変更する可能性があります。最良の結果を得るため、切り取りエリアを手動で調整することをお勧めします。', hi:'यह आकार आपकी फ़ोटो का मूल अनुपात बदल सकता है। सर्वोत्तम परिणाम के लिए, कृपया क्रॉप क्षेत्र को मैन्युअली समायोजित करें।', pt:'Este tamanho pode alterar a proporção original da sua foto. Para o melhor resultado, recomendamos ajustar a área de corte manualmente.', it:'Questa dimensione può alterare le proporzioni originali della tua foto. Per il miglior risultato, consigliamo di regolare l\'area di ritaglio manualmente.', ko:'이 크기는 사진의 원래 비율을 변경할 수 있습니다. 최상의 결과를 위해 직접 자르기 영역을 수동으로 조정하는 것을 권장합니다.', nl:'Deze grootte kan de originele beeldverhouding van uw foto wijzigen. Voor het beste resultaat raden wij aan het bijsnijdgebied handmatig aan te passen.', el:'Αυτό το μέγεθος ενδέχεται να αλλάξει την αρχική αναλογία διαστάσεων της φωτογραφίας σας. Για το καλύτερο αποτέλεσμα, σας συνιστούμε να ρυθμίσετε την περιοχή κοπής χειροκίνητα.' },
  err_convert:      { tr:'Dönüştürme sırasında bir hata oluştu. Lütfen tekrar deneyin.', en:'An error occurred during conversion. Please try again.', ar:'حدث خطأ أثناء التحويل. يرجى المحاولة مرة أخرى.', es:'Ocurrió un error durante la conversión. Inténtalo de nuevo.', fr:'Une erreur est survenue lors de la conversion. Veuillez réessayer.', de:'Bei der Konvertierung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.', ru:'При конвертации произошла ошибка. Попробуйте ещё раз.', zh:'转换时发生错误。请重试。', ja:'変換中にエラーが発生しました。もう一度お試しください。', hi:'रूपांतरण के दौरान एक त्रुटि हुई। कृपया पुनः प्रयास करें।', pt:'Ocorreu um erro durante a conversão. Por favor, tente novamente.', it:'Si è verificato un errore durante la conversione. Riprova.', ko:'변환 중 오류가 발생했습니다. 다시 시도하세요.', nl:'Er is een fout opgetreden tijdens de conversie. Probeer het opnieuw.', el:'Παρουσιάστηκε σφάλμα κατά τη μετατροπή. Παρακαλώ δοκιμάστε ξανά.' },
  success_zip:      { tr:'ZIP dosyası başarıyla indirildi!', en:'ZIP file downloaded successfully!', ar:'تم تنزيل ملف ZIP بنجاح!', es:'¡Archivo ZIP descargado con éxito!', fr:'Fichier ZIP téléchargé avec succès!', de:'ZIP-Datei erfolgreich heruntergeladen!', ru:'ZIP-файл успешно скачан!', zh:'ZIP 文件下载成功！', ja:'ZIPファイルのダウンロードが完了しました！', hi:'ZIP फ़ाइल सफलतापूर्वक डाउनलोड हुई!', pt:'Arquivo ZIP baixado com sucesso!', it:'File ZIP scaricato con successo!', ko:'ZIP 파일이 성공적으로 다운로드되었습니다!', nl:'ZIP-bestand succesvol gedownload!', el:'Το αρχείο ZIP λήφθηκε επιτυχώς!' },
  crop_set_label:   { tr:'Kırpma alanı ayarlandı', en:'Crop area set', ar:'تم ضبط منطقة القص', es:'Área de recorte establecida', fr:'Zone de recadrage définie', de:'Zuschneidebereich festgelegt', ru:'Область обрезки задана', zh:'裁剪区域已设置', ja:'トリミング領域が設定されました', hi:'क्रॉप क्षेत्र सेट किया गया', pt:'Área de corte definida', it:'Area di ritaglio impostata', ko:'자르기 영역 설정됨', nl:'Bijsnijdgebied ingesteld', el:'Η περιοχή περικοπής ορίστηκε' },
  crop_btn_tooltip: { tr:'Kırpma Alanını Ayarla', en:'Adjust Crop Area', ar:'ضبط منطقة القص', es:'Ajustar Área de Recorte', fr:'Ajuster la Zone de Recadrage', de:'Zuschneidebereich Anpassen', ru:'Настроить Область Обрезки', zh:'调整裁剪区域', ja:'トリミング領域を調整', hi:'क्रॉप क्षेत्र समायोजित करें', pt:'Ajustar Área de Corte', it:'Regola Area di Ritaglio', ko:'자르기 영역 조정', nl:'Bijsnijdgebied Aanpassen', el:'Ρύθμιση Περιοχής Περικοπής' },
  // Category names
  cat_social:     { tr:'Sosyal Medya', en:'Social Media', ar:'وسائل التواصل الاجتماعي', es:'Redes Sociales', fr:'Réseaux Sociaux', de:'Soziale Medien', ru:'Социальные Сети', zh:'社交媒体', ja:'ソーシャルメディア', hi:'सोशल मीडिया', pt:'Mídias Sociais', it:'Social Media', ko:'소셜 미디어', nl:'Sociale Media', el:'Κοινωνικά Μέσα' },
  cat_screens:    { tr:'Ekranlar & Duvar Kağıdı', en:'Screens & Wallpapers', ar:'الشاشات وخلفيات الشاشة', es:'Pantallas y Fondos', fr:'Écrans et Fonds d\'écran', de:'Bildschirme & Hintergründe', ru:'Экраны и Обои', zh:'屏幕与壁纸', ja:'スクリーン・壁紙', hi:'स्क्रीन और वॉलपेपर', pt:'Telas e Papéis de Parede', it:'Schermi e Sfondi', ko:'화면 및 배경화면', nl:'Schermen & Achtergronden', el:'Οθόνες & Ταπετσαρίες' },
  cat_ecommerce:  { tr:'E-Ticaret & Reklam', en:'E-Commerce & Ads', ar:'التجارة الإلكترونية والإعلانات', es:'E-Commerce y Anuncios', fr:'E-Commerce et Publicités', de:'E-Commerce & Werbung', ru:'Электронная Торговля и Реклама', zh:'电商与广告', ja:'Eコマース・広告', hi:'ई-कॉमर्स और विज्ञापन', pt:'E-Commerce e Anúncios', it:'E-Commerce e Pubblicità', ko:'전자상거래 및 광고', nl:'E-Commerce & Advertenties', el:'Ηλεκτρονικό Εμπόριο & Διαφημίσεις' },
    sz_tiktok_snapchat_wa_durum: { tr:'TikTok / Snapchat / WA Durum', en:'TikTok / Snapchat / WA Status', ar:'TikTok / Snapchat / WA حالة', es:'TikTok / Snapchat / WA Estado', fr:'TikTok / Snapchat / WA Statut', de:'TikTok / Snapchat / WA Status', ru:'TikTok / Snapchat / WA Статус', zh:'TikTok / Snapchat / WA 状态', ja:'TikTok / Snapchat / WA ステータス', hi:'TikTok / Snapchat / WA स्थिति', pt:'TikTok / Snapchat / WA Status', it:'TikTok / Snapchat / WA Stato', ko:'TikTok / Snapchat / WA 상태', nl:'TikTok / Snapchat / WA Status', el:'TikTok / Snapchat / WA Κατάσταση' },
  sz_full_hd_masa_st: { tr:'Full HD Masaüstü', en:'Full HD Desktop', ar:'Full HD سطح المكتب', es:'Full HD Escritorio', fr:'Full HD Bureau', de:'Full HD Desktop', ru:'Full HD Рабочий стол', zh:'Full HD 桌面', ja:'Full HD デスクトップ', hi:'Full HD डेस्कटॉप', pt:'Full HD Desktop', it:'Full HD Desktop', ko:'Full HD 데스크톱', nl:'Full HD Bureaublad', el:'Full HD Επιφάνεια εργασίας' },
  sz_iphone_15_14_13_standart: { tr:'iPhone 15 / 14 / 13 Standart', en:'iPhone 15 / 14 / 13 Standard', ar:'iPhone 15 / 14 / 13 قياسي', es:'iPhone 15 / 14 / 13 Estándar', fr:'iPhone 15 / 14 / 13 Standard', de:'iPhone 15 / 14 / 13 Standard', ru:'iPhone 15 / 14 / 13 Стандартный', zh:'iPhone 15 / 14 / 13 标准', ja:'iPhone 15 / 14 / 13 標準', hi:'iPhone 15 / 14 / 13 मानक', pt:'iPhone 15 / 14 / 13 Padrão', it:'iPhone 15 / 14 / 13 Standard', ko:'iPhone 15 / 14 / 13 표준', nl:'iPhone 15 / 14 / 13 Standaard', el:'iPhone 15 / 14 / 13 Πρότυπο' },
  sz_etsy_ma_aza_kapa: { tr:'Etsy Mağaza Kapağı', en:'Etsy Shop Kapağı', ar:'Etsy متجر Kapağı', es:'Etsy Tienda Kapağı', fr:'Etsy Boutique Kapağı', de:'Etsy Geschäft Kapağı', ru:'Etsy Магазин Kapağı', zh:'Etsy 商店 Kapağı', ja:'Etsy ショップ Kapağı', hi:'Etsy दुकان Kapağı', pt:'Etsy Loja Kapağı', it:'Etsy Negozio Kapağı', ko:'Etsy 상점 Kapağı', nl:'Etsy Winkel Kapağı', el:'Etsy Κατάστημα Kapağı' },
  sz_t_rk_e: { tr:'Türkçe', en:'Türkçe', ar:'Türkçe', es:'Türkçe', fr:'Türkçe', de:'Türkçe', ru:'Türkçe', zh:'Türkçe', ja:'Türkçe', hi:'Türkçe', pt:'Türkçe', it:'Türkçe', ko:'Türkçe', nl:'Türkçe', el:'Türkçe' },
  sz_ak_ll_saat_apple_watch: { tr:'Akıllı Saat / Apple Watch', en:'Smart Watch / Apple Watch', ar:'ساعة ذكية / Apple Watch', es:'Reloj Inteligente / Apple Watch', fr:'Montre Intelligente / Apple Watch', de:'Smartwatch / Apple Watch', ru:'Умные часы / Apple Watch', zh:'智能手表 / Apple Watch', ja:'スマートウォッチ / Apple Watch', hi:'स्मार्ट वॉच / Apple Watch', pt:'Relógio Inteligente / Apple Watch', it:'Smartwatch / Apple Watch', ko:'스마트워치 / Apple Watch', nl:'Smartwatch / Apple Watch', el:'Smartwatch / Apple Watch' },
  sz_iphone_13_mini_12_mini: { tr:'iPhone 13 Mini / 12 Mini', en:'iPhone 13 Mini / 12 Mini', ar:'iPhone 13 Mini / 12 Mini', es:'iPhone 13 Mini / 12 Mini', fr:'iPhone 13 Mini / 12 Mini', de:'iPhone 13 Mini / 12 Mini', ru:'iPhone 13 Mini / 12 Mini', zh:'iPhone 13 Mini / 12 Mini', ja:'iPhone 13 Mini / 12 Mini', hi:'iPhone 13 Mini / 12 Mini', pt:'iPhone 13 Mini / 12 Mini', it:'iPhone 13 Mini / 12 Mini', ko:'iPhone 13 Mini / 12 Mini', nl:'iPhone 13 Mini / 12 Mini', el:'iPhone 13 Mini / 12 Mini' },
  sz_greek: { tr:'Greek', en:'Greek', ar:'Greek', es:'Greek', fr:'Greek', de:'Greek', ru:'Greek', zh:'Greek', ja:'Greek', hi:'Greek', pt:'Greek', it:'Greek', ko:'Greek', nl:'Greek', el:'Greek' },
  sz_50x70_cm_b_y_k_tablo: { tr:'50x70 cm Büyük Tablo', en:'50x70 cm Büyük Tablo', ar:'50x70 cm Büyük Tablo', es:'50x70 cm Büyük Tablo', fr:'50x70 cm Büyük Tablo', de:'50x70 cm Büyük Tablo', ru:'50x70 cm Büyük Tablo', zh:'50x70 cm Büyük Tablo', ja:'50x70 cm Büyük Tablo', hi:'50x70 cm Büyük Tablo', pt:'50x70 cm Büyük Tablo', it:'50x70 cm Büyük Tablo', ko:'50x70 cm Büyük Tablo', nl:'50x70 cm Büyük Tablo', el:'50x70 cm Büyük Tablo' },
  sz_samsung_galaxy_s24_ultra_s23_ultra: { tr:'Samsung Galaxy S24 Ultra / S23 Ultra', en:'Samsung Galaxy S24 Ultra / S23 Ultra', ar:'Samsung Galaxy S24 Ultra / S23 Ultra', es:'Samsung Galaxy S24 Ultra / S23 Ultra', fr:'Samsung Galaxy S24 Ultra / S23 Ultra', de:'Samsung Galaxy S24 Ultra / S23 Ultra', ru:'Samsung Galaxy S24 Ultra / S23 Ultra', zh:'Samsung Galaxy S24 Ultra / S23 Ultra', ja:'Samsung Galaxy S24 Ultra / S23 Ultra', hi:'Samsung Galaxy S24 Ultra / S23 Ultra', pt:'Samsung Galaxy S24 Ultra / S23 Ultra', it:'Samsung Galaxy S24 Ultra / S23 Ultra', ko:'Samsung Galaxy S24 Ultra / S23 Ultra', nl:'Samsung Galaxy S24 Ultra / S23 Ultra', el:'Samsung Galaxy S24 Ultra / S23 Ultra' },
  sz_instagram_hikaye_reels: { tr:'Instagram Hikaye / Reels', en:'Instagram Story / Reels', ar:'Instagram قصة / Reels', es:'Instagram Historia / Reels', fr:'Instagram Histoire / Reels', de:'Instagram Story / Reels', ru:'Instagram История / Reels', zh:'Instagram 故事 / Reels', ja:'Instagram ストーリー / Reels', hi:'Instagram स्टोरी / Reels', pt:'Instagram História / Reels', it:'Instagram Storia / Reels', ko:'Instagram 스토리 / Reels', nl:'Instagram Verhaal / Reels', el:'Instagram Ιστορία / Reels' },
  sz_hindi: { tr:'Hindi', en:'Hindi', ar:'Hindi', es:'Hindi', fr:'Hindi', de:'Hindi', ru:'Hindi', zh:'Hindi', ja:'Hindi', hi:'Hindi', pt:'Hindi', it:'Hindi', ko:'Hindi', nl:'Hindi', el:'Hindi' },
  sz_youtube_kanal_banneri: { tr:'YouTube Kanal Banneri', en:'YouTube Kanal Banneri', ar:'YouTube Kanal Banneri', es:'YouTube Kanal Banneri', fr:'YouTube Kanal Banneri', de:'YouTube Kanal Banneri', ru:'YouTube Kanal Banneri', zh:'YouTube Kanal Banneri', ja:'YouTube Kanal Banneri', hi:'YouTube Kanal Banneri', pt:'YouTube Kanal Banneri', it:'YouTube Kanal Banneri', ko:'YouTube Kanal Banneri', nl:'YouTube Kanal Banneri', el:'YouTube Kanal Banneri' },
  sz_linkedin_ki_isel_kapak: { tr:'LinkedIn Kişisel Kapak', en:'LinkedIn Personal Cover', ar:'LinkedIn شخصي غلاف', es:'LinkedIn Personal Portada', fr:'LinkedIn Personnel Couverture', de:'LinkedIn Persönlich Titelbild', ru:'LinkedIn Личный Обложка', zh:'LinkedIn 个人 封面', ja:'LinkedIn 個人 カバー', hi:'LinkedIn व्यक्तिगत कवर', pt:'LinkedIn Pessoal Capa', it:'LinkedIn Personale Copertina', ko:'LinkedIn 개인 커버', nl:'LinkedIn Persoonlijk Omslag', el:'LinkedIn Προσωπικό Εξώφυλλο' },
  sz_xiaomi_redmi_note_13_pro: { tr:'Xiaomi Redmi Note 13 Pro', en:'Xiaomi Redmi Note 13 Pro', ar:'Xiaomi Redmi Note 13 Pro', es:'Xiaomi Redmi Note 13 Pro', fr:'Xiaomi Redmi Note 13 Pro', de:'Xiaomi Redmi Note 13 Pro', ru:'Xiaomi Redmi Note 13 Pro', zh:'Xiaomi Redmi Note 13 Pro', ja:'Xiaomi Redmi Note 13 Pro', hi:'Xiaomi Redmi Note 13 Pro', pt:'Xiaomi Redmi Note 13 Pro', it:'Xiaomi Redmi Note 13 Pro', ko:'Xiaomi Redmi Note 13 Pro', nl:'Xiaomi Redmi Note 13 Pro', el:'Xiaomi Redmi Note 13 Pro' },
  sz_10x15_cm_klasik_alb_m_bask_s: { tr:'10x15 cm Klasik Albüm Baskısı', en:'10x15 cm Classic Album Print', ar:'10x15 cm طباعة ألبوم كلاسيكي', es:'10x15 cm Impresión Clásica', fr:'10x15 cm Impression Classique', de:'10x15 cm Klassischer Druck', ru:'10x15 cm Классическая печать', zh:'10x15 cm 经典相册打印', ja:'10x15 cm クラシックプリント', hi:'10x15 cm क्लासिक प्रिंट', pt:'10x15 cm Impressão Clássica', it:'10x15 cm Stampa Classica', ko:'10x15 cm 클래식 프린트', nl:'10x15 cm Klassieke Print', el:'10x15 cm Κλασική Εκτύπωση' },
  sz_8k_ekran: { tr:'8K Ekran', en:'8K Screen', ar:'8K شاشة', es:'8K Pantalla', fr:'8K Écran', de:'8K Bildschirm', ru:'8K Экран', zh:'8K 屏幕', ja:'8K 画面', hi:'8K स्क्रीन', pt:'8K Tela', it:'8K Schermo', ko:'8K 화면', nl:'8K Scherm', el:'8K Οθόνη' },
  sz_german: { tr:'German', en:'German', ar:'German', es:'German', fr:'German', de:'German', ru:'German', zh:'German', ja:'German', hi:'German', pt:'German', it:'German', ko:'German', nl:'German', el:'German' },
  sz_japanese: { tr:'Japanese', en:'Japanese', ar:'Japanese', es:'Japanese', fr:'Japanese', de:'Japanese', ru:'Japanese', zh:'Japanese', ja:'Japanese', hi:'Japanese', pt:'Japanese', it:'Japanese', ko:'Japanese', nl:'Japanese', el:'Japanese' },
  sz_hd_laptop: { tr:'HD Laptop', en:'HD Laptop', ar:'HD Laptop', es:'HD Laptop', fr:'HD Laptop', de:'HD Laptop', ru:'HD Laptop', zh:'HD Laptop', ja:'HD Laptop', hi:'HD Laptop', pt:'HD Laptop', it:'HD Laptop', ko:'HD Laptop', nl:'HD Laptop', el:'HD Laptop' },
  sz_instagram_dikey_g_nderi: { tr:'Instagram Dikey Gönderi', en:'Instagram Vertical Post', ar:'Instagram عمودي منشور', es:'Instagram Vertical Publicación', fr:'Instagram Vertical Publication', de:'Instagram Vertikal Beitrag', ru:'Instagram Вертикальный Пост', zh:'Instagram 垂直 帖子', ja:'Instagram 垂直 投稿', hi:'Instagram वर्टिकल पोस्ट', pt:'Instagram Vertical Postagem', it:'Instagram Verticale Post', ko:'Instagram 수직 게시물', nl:'Instagram Verticaal Bericht', el:'Instagram Κάθετη Δημοσίευση' },
  sz_xiaomi_14_pro: { tr:'Xiaomi 14 Pro', en:'Xiaomi 14 Pro', ar:'Xiaomi 14 Pro', es:'Xiaomi 14 Pro', fr:'Xiaomi 14 Pro', de:'Xiaomi 14 Pro', ru:'Xiaomi 14 Pro', zh:'Xiaomi 14 Pro', ja:'Xiaomi 14 Pro', hi:'Xiaomi 14 Pro', pt:'Xiaomi 14 Pro', it:'Xiaomi 14 Pro', ko:'Xiaomi 14 Pro', nl:'Xiaomi 14 Pro', el:'Xiaomi 14 Pro' },
  sz_italian: { tr:'Italian', en:'Italian', ar:'Italian', es:'Italian', fr:'Italian', de:'Italian', ru:'Italian', zh:'Italian', ja:'Italian', hi:'Italian', pt:'Italian', it:'Italian', ko:'Italian', nl:'Italian', el:'Italian' },
  sz_35x50_cm_poster_tablo: { tr:'35x50 cm Poster / Tablo', en:'35x50 cm Poster / Painting', ar:'35x50 cm ملصق / لوحة', es:'35x50 cm Póster / Cuadro', fr:'35x50 cm Affiche / Tableau', de:'35x50 cm Poster / Gemälde', ru:'35x50 cm Плакат / Картина', zh:'35x50 cm 海报/画作', ja:'35x50 cm ポスター/絵画', hi:'35x50 cm पोस्टर / चित्र', pt:'35x50 cm Pôster / Quadro', it:'35x50 cm Poster / Quadro', ko:'35x50 cm 포스터 / 그림', nl:'35x50 cm Poster / Schilderij', el:'35x50 cm Αφίσα / Πίνακας' },
  sz_a3_k_k_afi: { tr:'A3 Küçük Afiş', en:'A3 Small Poster', ar:'A3 ملصق صغير', es:'A3 Póster Pequeño', fr:'A3 Petite Affiche', de:'A3 Kleines Poster', ru:'A3 Маленький плакат', zh:'A3 小海报', ja:'A3 小ポスター', hi:'A3 छोटा पोस्टर', pt:'A3 Pôster Pequeno', it:'A3 Piccolo Poster', ko:'A3 소형 포스터', nl:'A3 Kleine Poster', el:'A3 Μικρή Αφίσα' },
  sz_spanish: { tr:'Spanish', en:'Spanish', ar:'Spanish', es:'Spanish', fr:'Spanish', de:'Spanish', ru:'Spanish', zh:'Spanish', ja:'Spanish', hi:'Spanish', pt:'Spanish', it:'Spanish', ko:'Spanish', nl:'Spanish', el:'Spanish' },
  sz_portuguese: { tr:'Portuguese', en:'Portuguese', ar:'Portuguese', es:'Portuguese', fr:'Portuguese', de:'Portuguese', ru:'Portuguese', zh:'Portuguese', ja:'Portuguese', hi:'Portuguese', pt:'Portuguese', it:'Portuguese', ko:'Portuguese', nl:'Portuguese', el:'Portuguese' },
  sz_chinese: { tr:'Chinese', en:'Chinese', ar:'Chinese', es:'Chinese', fr:'Chinese', de:'Chinese', ru:'Chinese', zh:'Chinese', ja:'Chinese', hi:'Chinese', pt:'Chinese', it:'Chinese', ko:'Chinese', nl:'Chinese', el:'Chinese' },
  sz_google_reklam_kare: { tr:'Google Reklam - Kare', en:'Google Ad - Square', ar:'Google إعلان - مربع', es:'Google Anuncio - Cuadrado', fr:'Google Annonce - Carré', de:'Google Anzeige - Quadrat', ru:'Google Реклама - Квадрат', zh:'Google 广告 - 正方形', ja:'Google 広告 - スクエア', hi:'Google विज्ञापन - वर्ग', pt:'Google Anúncio - Quadrado', it:'Google Annuncio - Quadrato', ko:'Google 광고 - 정사각형', nl:'Google Advertentie - Vierkant', el:'Google Διαφήμιση - Τετράγωνο' },
  sz_youtube_profil_foto_raf: { tr:'YouTube Profil Fotoğrafı', en:'YouTube Profile Photo', ar:'YouTube صورة الملف الشخصي', es:'YouTube Foto de Perfil', fr:'YouTube Photo de Profil', de:'YouTube Profilbild', ru:'YouTube Фото профиля', zh:'YouTube 个人资料照片', ja:'YouTube プロフィール写真', hi:'YouTube प्रोफाइल फोटो', pt:'YouTube Foto de Perfil', it:'YouTube Foto del Profilo', ko:'YouTube 프로필 사진', nl:'YouTube Profielfoto', el:'YouTube Φωτογραφία Προφίλ' },
  sz_biyometrik_vesikal_k_foto_raf: { tr:'Biyometrik / Vesikalık Fotoğraf', en:'Biometric / Passport Photo', ar:'صورة جواز السفر', es:'Foto Biométrica', fr:'Photo Biométrique', de:'Biometrisches Foto', ru:'Биометрическое фото', zh:'生物特征照片', ja:'生体認証写真', hi:'बायोमेट्रिक फोटो', pt:'Foto Biométrica', it:'Foto Biometrica', ko:'생체 인식 사진', nl:'Biometrische Foto', el:'Βιομετρική Φωτογραφία' },
  sz_a4_belge_kt: { tr:'A4 Belge / Çıktı', en:'A4 Document / Printout', ar:'A4 مستند / طباعة', es:'A4 Documento', fr:'A4 Document', de:'A4 Dokument', ru:'A4 Документ', zh:'A4 文档', ja:'A4 ドキュメント', hi:'A4 दस्तावेज़', pt:'A4 Documento', it:'A4 Documento', ko:'A4 문서', nl:'A4 Document', el:'A4 Έγγραφο' },
  sz_70x100_cm_sinema_afi_i: { tr:'70x100 cm Sinema Afişi', en:'70x100 cm Sinema Afişi', ar:'70x100 cm Sinema Afişi', es:'70x100 cm Sinema Afişi', fr:'70x100 cm Sinema Afişi', de:'70x100 cm Sinema Afişi', ru:'70x100 cm Sinema Afişi', zh:'70x100 cm Sinema Afişi', ja:'70x100 cm Sinema Afişi', hi:'70x100 cm Sinema Afişi', pt:'70x100 cm Sinema Afişi', it:'70x100 cm Sinema Afişi', ko:'70x100 cm Sinema Afişi', nl:'70x100 cm Sinema Afişi', el:'70x100 cm Sinema Afişi' },
  sz_ipad_pro_12_9_tablet: { tr:'iPad Pro 12.9" Tablet', en:'iPad Pro 12.9" Tablet', ar:'iPad Pro 12.9" حاسوب لوحي', es:'iPad Pro 12.9" Tableta', fr:'iPad Pro 12.9" Tablette', de:'iPad Pro 12.9" Tablet', ru:'iPad Pro 12.9" Планшет', zh:'iPad Pro 12.9" 平板电脑', ja:'iPad Pro 12.9" タブレット', hi:'iPad Pro 12.9" टैबलेट', pt:'iPad Pro 12.9" Tablet', it:'iPad Pro 12.9" Tablet', ko:'iPad Pro 12.9" 태블릿', nl:'iPad Pro 12.9" Tablet', el:'iPad Pro 12.9" Tablet' },
  sz_dutch: { tr:'Dutch', en:'Dutch', ar:'Dutch', es:'Dutch', fr:'Dutch', de:'Dutch', ru:'Dutch', zh:'Dutch', ja:'Dutch', hi:'Dutch', pt:'Dutch', it:'Dutch', ko:'Dutch', nl:'Dutch', el:'Dutch' },
  sz_samsung_galaxy_s24_s23: { tr:'Samsung Galaxy S24 / S23', en:'Samsung Galaxy S24 / S23', ar:'Samsung Galaxy S24 / S23', es:'Samsung Galaxy S24 / S23', fr:'Samsung Galaxy S24 / S23', de:'Samsung Galaxy S24 / S23', ru:'Samsung Galaxy S24 / S23', zh:'Samsung Galaxy S24 / S23', ja:'Samsung Galaxy S24 / S23', hi:'Samsung Galaxy S24 / S23', pt:'Samsung Galaxy S24 / S23', it:'Samsung Galaxy S24 / S23', ko:'Samsung Galaxy S24 / S23', nl:'Samsung Galaxy S24 / S23', el:'Samsung Galaxy S24 / S23' },
  sz_web_sitesi_favicon: { tr:'Web Sitesi Favicon', en:'Website Favicon', ar:'موقع إلكتروني Favicon', es:'Sitio Web Favicon', fr:'Site Web Favicon', de:'Webseite Favicon', ru:'Веб-сайт Favicon', zh:'网站 Favicon', ja:'ウェブサイト Favicon', hi:'वेबसाइट Favicon', pt:'Site Favicon', it:'Sito Web Favicon', ko:'웹사이트 Favicon', nl:'Website Favicon', el:'Ιστότοπος Favicon' },
  sz_x_twitter_kapak: { tr:'X (Twitter) Kapak', en:'X (Twitter) Cover', ar:'X (Twitter) غلاف', es:'X (Twitter) Portada', fr:'X (Twitter) Couverture', de:'X (Twitter) Titelbild', ru:'X (Twitter) Обложка', zh:'X (Twitter) 封面', ja:'X (Twitter) カバー', hi:'X (Twitter) कवर', pt:'X (Twitter) Capa', it:'X (Twitter) Copertina', ko:'X (Twitter) 커버', nl:'X (Twitter) Omslag', el:'X (Twitter) Εξώφυλλο' },
  sz_samsung_galaxy_a55_a54: { tr:'Samsung Galaxy A55 / A54', en:'Samsung Galaxy A55 / A54', ar:'Samsung Galaxy A55 / A54', es:'Samsung Galaxy A55 / A54', fr:'Samsung Galaxy A55 / A54', de:'Samsung Galaxy A55 / A54', ru:'Samsung Galaxy A55 / A54', zh:'Samsung Galaxy A55 / A54', ja:'Samsung Galaxy A55 / A54', hi:'Samsung Galaxy A55 / A54', pt:'Samsung Galaxy A55 / A54', it:'Samsung Galaxy A55 / A54', ko:'Samsung Galaxy A55 / A54', nl:'Samsung Galaxy A55 / A54', el:'Samsung Galaxy A55 / A54' },
  sz_arabic: { tr:'Arabic', en:'Arabic', ar:'Arabic', es:'Arabic', fr:'Arabic', de:'Arabic', ru:'Arabic', zh:'Arabic', ja:'Arabic', hi:'Arabic', pt:'Arabic', it:'Arabic', ko:'Arabic', nl:'Arabic', el:'Arabic' },
  sz_french: { tr:'French', en:'French', ar:'French', es:'French', fr:'French', de:'French', ru:'French', zh:'French', ja:'French', hi:'French', pt:'French', it:'French', ko:'French', nl:'French', el:'French' },
  sz_facebook_etkinlik_kapa: { tr:'Facebook Etkinlik Kapağı', en:'Facebook Event Kapağı', ar:'Facebook حدث Kapağı', es:'Facebook Evento Kapağı', fr:'Facebook Événement Kapağı', de:'Facebook Ereignis Kapağı', ru:'Facebook Событие Kapağı', zh:'Facebook 事件 Kapağı', ja:'Facebook イベント Kapağı', hi:'Facebook घटना Kapağı', pt:'Facebook Evento Kapağı', it:'Facebook Evento Kapağı', ko:'Facebook 이벤트 Kapağı', nl:'Facebook Evenement Kapağı', el:'Facebook Εκδήλωση Kapağı' },
  sz_samsung_galaxy_z_fold_5_i_ekran: { tr:'Samsung Galaxy Z Fold 5 - İç Ekran', en:'Samsung Galaxy Z Fold 5 - İç Screen', ar:'Samsung Galaxy Z Fold 5 - İç شاشة', es:'Samsung Galaxy Z Fold 5 - İç Pantalla', fr:'Samsung Galaxy Z Fold 5 - İç Écran', de:'Samsung Galaxy Z Fold 5 - İç Bildschirm', ru:'Samsung Galaxy Z Fold 5 - İç Экран', zh:'Samsung Galaxy Z Fold 5 - İç 屏幕', ja:'Samsung Galaxy Z Fold 5 - İç 画面', hi:'Samsung Galaxy Z Fold 5 - İç स्क्रीन', pt:'Samsung Galaxy Z Fold 5 - İç Tela', it:'Samsung Galaxy Z Fold 5 - İç Schermo', ko:'Samsung Galaxy Z Fold 5 - İç 화면', nl:'Samsung Galaxy Z Fold 5 - İç Scherm', el:'Samsung Galaxy Z Fold 5 - İç Οθόνη' },
  sz_standart_ak_ll_telefon: { tr:'Standart Akıllı Telefon', en:'Standard Smartphone', ar:'قياسي هاتف ذكي', es:'Estándar Teléfono Inteligente', fr:'Standard Smartphone', de:'Standard Smartphone', ru:'Стандартный Смартфон', zh:'标准 智能手机', ja:'標準 スマートフォン', hi:'मानक स्मार्टफोन', pt:'Padrão Smartphone', it:'Standard Smartphone', ko:'표준 스마트폰', nl:'Standaard Smartphone', el:'Πρότυπο Smartphone' },
  sz_samsung_galaxy_a35_a25: { tr:'Samsung Galaxy A35 / A25', en:'Samsung Galaxy A35 / A25', ar:'Samsung Galaxy A35 / A25', es:'Samsung Galaxy A35 / A25', fr:'Samsung Galaxy A35 / A25', de:'Samsung Galaxy A35 / A25', ru:'Samsung Galaxy A35 / A25', zh:'Samsung Galaxy A35 / A25', ja:'Samsung Galaxy A35 / A25', hi:'Samsung Galaxy A35 / A25', pt:'Samsung Galaxy A35 / A25', it:'Samsung Galaxy A35 / A25', ko:'Samsung Galaxy A35 / A25', nl:'Samsung Galaxy A35 / A25', el:'Samsung Galaxy A35 / A25' },
  sz_russian: { tr:'Russian', en:'Russian', ar:'Russian', es:'Russian', fr:'Russian', de:'Russian', ru:'Russian', zh:'Russian', ja:'Russian', hi:'Russian', pt:'Russian', it:'Russian', ko:'Russian', nl:'Russian', el:'Russian' },
  sz_2k_qhd_monit_r: { tr:'2K / QHD Monitör', en:'2K / QHD Monitor', ar:'2K / QHD شاشة', es:'2K / QHD Monitor', fr:'2K / QHD Moniteur', de:'2K / QHD Monitor', ru:'2K / QHD Монитор', zh:'2K / QHD 显示器', ja:'2K / QHD モニター', hi:'2K / QHD मॉनिटर', pt:'2K / QHD Monitor', it:'2K / QHD Monitor', ko:'2K / QHD 모니터', nl:'2K / QHD Monitor', el:'2K / QHD Οθόνη' },
  sz_google_reklam_leaderboard: { tr:'Google Reklam - Leaderboard', en:'Google Ad - Leaderboard', ar:'Google إعلان - Leaderboard', es:'Google Anuncio - Leaderboard', fr:'Google Annonce - Leaderboard', de:'Google Anzeige - Leaderboard', ru:'Google Реклама - Leaderboard', zh:'Google 广告 - Leaderboard', ja:'Google 広告 - Leaderboard', hi:'Google विज्ञापन - Leaderboard', pt:'Google Anúncio - Leaderboard', it:'Google Annuncio - Leaderboard', ko:'Google 광고 - Leaderboard', nl:'Google Advertentie - Leaderboard', el:'Google Διαφήμιση - Leaderboard' },
  sz_korean: { tr:'Korean', en:'Korean', ar:'Korean', es:'Korean', fr:'Korean', de:'Korean', ru:'Korean', zh:'Korean', ja:'Korean', hi:'Korean', pt:'Korean', it:'Korean', ko:'Korean', nl:'Korean', el:'Korean' },
  sz_google_pixel_8_pro: { tr:'Google Pixel 8 Pro', en:'Google Pixel 8 Pro', ar:'Google Pixel 8 Pro', es:'Google Pixel 8 Pro', fr:'Google Pixel 8 Pro', de:'Google Pixel 8 Pro', ru:'Google Pixel 8 Pro', zh:'Google Pixel 8 Pro', ja:'Google Pixel 8 Pro', hi:'Google Pixel 8 Pro', pt:'Google Pixel 8 Pro', it:'Google Pixel 8 Pro', ko:'Google Pixel 8 Pro', nl:'Google Pixel 8 Pro', el:'Google Pixel 8 Pro' },
  sz_pinterest_pin: { tr:'Pinterest Pin', en:'Pinterest Pin', ar:'Pinterest Pin', es:'Pinterest Pin', fr:'Pinterest Pin', de:'Pinterest Pin', ru:'Pinterest Pin', zh:'Pinterest Pin', ja:'Pinterest Pin', hi:'Pinterest Pin', pt:'Pinterest Pin', it:'Pinterest Pin', ko:'Pinterest Pin', nl:'Pinterest Pin', el:'Pinterest Pin' },
  sz_twitch_evrimd_ekran: { tr:'Twitch Çevrimdışı Ekranı', en:'Twitch Offline Screen', ar:'Twitch شاشة غير متصل', es:'Twitch Pantalla Offline', fr:'Twitch Écran Hors Ligne', de:'Twitch Offline-Bildschirm', ru:'Twitch Офлайн Экран', zh:'Twitch 离线屏幕', ja:'Twitch オフライン画面', hi:'Twitch ऑफ़लाइन स्क्रीन', pt:'Twitch Tela Offline', it:'Twitch Schermo Offline', ko:'Twitch 오프라인 화면', nl:'Twitch Offline Scherm', el:'Twitch Οθόνη εκτός σύνδεσης' },
  sz_macbook_pro_16: { tr:'MacBook Pro 16"', en:'MacBook Pro 16"', ar:'MacBook Pro 16"', es:'MacBook Pro 16"', fr:'MacBook Pro 16"', de:'MacBook Pro 16"', ru:'MacBook Pro 16"', zh:'MacBook Pro 16"', ja:'MacBook Pro 16"', hi:'MacBook Pro 16"', pt:'MacBook Pro 16"', it:'MacBook Pro 16"', ko:'MacBook Pro 16"', nl:'MacBook Pro 16"', el:'MacBook Pro 16"' },
  sz_iphone_15_14_pro_max: { tr:'iPhone 15 / 14 Pro Max', en:'iPhone 15 / 14 Pro Max', ar:'iPhone 15 / 14 Pro Max', es:'iPhone 15 / 14 Pro Max', fr:'iPhone 15 / 14 Pro Max', de:'iPhone 15 / 14 Pro Max', ru:'iPhone 15 / 14 Pro Max', zh:'iPhone 15 / 14 Pro Max', ja:'iPhone 15 / 14 Pro Max', hi:'iPhone 15 / 14 Pro Max', pt:'iPhone 15 / 14 Pro Max', it:'iPhone 15 / 14 Pro Max', ko:'iPhone 15 / 14 Pro Max', nl:'iPhone 15 / 14 Pro Max', el:'iPhone 15 / 14 Pro Max' },
  sz_english: { tr:'English', en:'English', ar:'English', es:'English', fr:'English', de:'English', ru:'English', zh:'English', ja:'English', hi:'English', pt:'English', it:'English', ko:'English', nl:'English', el:'English' },
  sz_15x21_cm_b_y_k_bask: { tr:'15x21 cm Büyük Baskı', en:'15x21 cm Large Print', ar:'15x21 cm طباعة كبيرة', es:'15x21 cm Impresión Grande', fr:'15x21 cm Grande Impression', de:'15x21 cm Großer Druck', ru:'15x21 cm Большая печать', zh:'15x21 cm 大幅打印', ja:'15x21 cm 大判プリント', hi:'15x21 cm बड़ा प्रिंट', pt:'15x21 cm Impressão Grande', it:'15x21 cm Stampa Grande', ko:'15x21 cm 대형 프린트', nl:'15x21 cm Grote Print', el:'15x21 cm Μεγάλη Εκτύπωση' },
  sz_samsung_galaxy_a07: { tr:'Samsung Galaxy A07', en:'Samsung Galaxy A07', ar:'Samsung Galaxy A07', es:'Samsung Galaxy A07', fr:'Samsung Galaxy A07', de:'Samsung Galaxy A07', ru:'Samsung Galaxy A07', zh:'Samsung Galaxy A07', ja:'Samsung Galaxy A07', hi:'Samsung Galaxy A07', pt:'Samsung Galaxy A07', it:'Samsung Galaxy A07', ko:'Samsung Galaxy A07', nl:'Samsung Galaxy A07', el:'Samsung Galaxy A07' },
  sz_x_twitter_g_nderi: { tr:'X (Twitter) Gönderi', en:'X (Twitter) Post', ar:'X (Twitter) منشور', es:'X (Twitter) Publicación', fr:'X (Twitter) Publication', de:'X (Twitter) Beitrag', ru:'X (Twitter) Пост', zh:'X (Twitter) 帖子', ja:'X (Twitter) 投稿', hi:'X (Twitter) पोस्ट', pt:'X (Twitter) Postagem', it:'X (Twitter) Post', ko:'X (Twitter) 게시물', nl:'X (Twitter) Bericht', el:'X (Twitter) Δημοσίευση' },
  sz_standart_kartvizit: { tr:'Standart Kartvizit', en:'Standard Business Card', ar:'قياسي بطاقة عمل', es:'Estándar Tarjeta de Visita', fr:'Standard Carte de Visite', de:'Standard Visitenkarte', ru:'Стандартный Визитка', zh:'标准 名片', ja:'標準 名刺', hi:'मानक विजिटिंग कार्ड', pt:'Padrão Cartão de Visita', it:'Standard Biglietto da Visita', ko:'표준 명함', nl:'Standaard Visitekaartje', el:'Πρότυπο Επαγγελματική Κάρτα' },
  sz_youtube_kapak_thumbnail: { tr:'YouTube Kapak / Thumbnail', en:'YouTube Cover / Thumbnail', ar:'YouTube غلاف / Thumbnail', es:'YouTube Portada / Thumbnail', fr:'YouTube Couverture / Thumbnail', de:'YouTube Titelbild / Thumbnail', ru:'YouTube Обложка / Thumbnail', zh:'YouTube 封面 / Thumbnail', ja:'YouTube カバー / Thumbnail', hi:'YouTube कवर / Thumbnail', pt:'YouTube Capa / Thumbnail', it:'YouTube Copertina / Thumbnail', ko:'YouTube 커버 / Thumbnail', nl:'YouTube Omslag / Thumbnail', el:'YouTube Εξώφυλλο / Thumbnail' },
  sz_amazon_trendyol_r_n_g_rseli: { tr:'Amazon/Trendyol Ürün Görseli', en:'Amazon/Trendyol Product Image', ar:'Amazon/Trendyol صورة المنتج', es:'Amazon/Trendyol Imagen del Producto', fr:'Amazon/Trendyol Image du Produit', de:'Amazon/Trendyol Produktbild', ru:'Amazon/Trendyol Изображение продукта', zh:'Amazon/Trendyol 产品图片', ja:'Amazon/Trendyol 商品画像', hi:'Amazon/Trendyol उत्पाद छवि', pt:'Amazon/Trendyol Imagem do Produto', it:'Amazon/Trendyol Immagine del Prodotto', ko:'Amazon/Trendyol 제품 이미지', nl:'Amazon/Trendyol Productafbeelding', el:'Amazon/Trendyol Εικόνα Προϊόντος' },
  sz_a5_defter_kitap: { tr:'A5 Defter / Kitap', en:'A5 Notebook / Book', ar:'A5 دفتر / كتاب', es:'A5 Cuaderno / Libro', fr:'A5 Cahier / Livre', de:'A5 Notizbuch / Buch', ru:'A5 Тетрадь / Книга', zh:'A5 笔记本/书', ja:'A5 ノート/本', hi:'A5 नोटबुक / किताब', pt:'A5 Caderno / Livro', it:'A5 Quaderno / Libro', ko:'A5 노트북 / 책', nl:'A5 Notitieboek / Boek', el:'A5 Τετράδιο / Βιβλίο' },
  sz_13x18_cm_standart_bask: { tr:'13x18 cm Standart Baskı', en:'13x18 cm Standard Baskı', ar:'13x18 cm قياسي Baskı', es:'13x18 cm Estándar Baskı', fr:'13x18 cm Standard Baskı', de:'13x18 cm Standard Baskı', ru:'13x18 cm Стандартный Baskı', zh:'13x18 cm 标准 Baskı', ja:'13x18 cm 標準 Baskı', hi:'13x18 cm मानक Baskı', pt:'13x18 cm Padrão Baskı', it:'13x18 cm Standard Baskı', ko:'13x18 cm 표준 Baskı', nl:'13x18 cm Standaard Baskı', el:'13x18 cm Πρότυπο Baskı' },
  sz_google_reklam_yar_m_sayfa: { tr:'Google Reklam - Yarım Sayfa', en:'Google Ad - Half Page', ar:'Google إعلان - نصف صفحة', es:'Google Anuncio - Media Página', fr:'Google Annonce - Demi-page', de:'Google Anzeige - Halbe Seite', ru:'Google Реклама - Полстраницы', zh:'Google 广告 - 半页', ja:'Google 広告 - ハーフページ', hi:'Google विज्ञापन - आधा पृष्ठ', pt:'Google Anúncio - Meia Página', it:'Google Annuncio - Mezza Pagina', ko:'Google 광고 - 반 페이지', nl:'Google Advertentie - Halve Pagina', el:'Google Διαφήμιση - Μισή Σελίδα' },
  sz_4k_uhd_tv_ve_monit_r: { tr:'4K / UHD TV ve Monitör', en:'4K / UHD TV ve Monitor', ar:'4K / UHD TV ve شاشة', es:'4K / UHD TV ve Monitor', fr:'4K / UHD TV ve Moniteur', de:'4K / UHD TV ve Monitor', ru:'4K / UHD TV ve Монитор', zh:'4K / UHD TV ve 显示器', ja:'4K / UHD TV ve モニター', hi:'4K / UHD TV ve मॉनिटर', pt:'4K / UHD TV ve Monitor', it:'4K / UHD TV ve Monitor', ko:'4K / UHD TV ve 모니터', nl:'4K / UHD TV ve Monitor', el:'4K / UHD TV ve Οθόνη' },
  sz_iphone_14_15_pro_max: { tr:'iPhone 14/15 Pro Max', en:'iPhone 14/15 Pro Max', ar:'iPhone 14/15 Pro Max', es:'iPhone 14/15 Pro Max', fr:'iPhone 14/15 Pro Max', de:'iPhone 14/15 Pro Max', ru:'iPhone 14/15 Pro Max', zh:'iPhone 14/15 Pro Max', ja:'iPhone 14/15 Pro Max', hi:'iPhone 14/15 Pro Max', pt:'iPhone 14/15 Pro Max', it:'iPhone 14/15 Pro Max', ko:'iPhone 14/15 Pro Max', nl:'iPhone 14/15 Pro Max', el:'iPhone 14/15 Pro Max' },
  sz_facebook_g_nderi: { tr:'Facebook Gönderi', en:'Facebook Post', ar:'Facebook منشور', es:'Facebook Publicación', fr:'Facebook Publication', de:'Facebook Beitrag', ru:'Facebook Пост', zh:'Facebook 帖子', ja:'Facebook 投稿', hi:'Facebook पोस्ट', pt:'Facebook Postagem', it:'Facebook Post', ko:'Facebook 게시물', nl:'Facebook Bericht', el:'Facebook Δημοσίευση' },
  sz_honor_200: { tr:'Honor 200', en:'Honor 200', ar:'Honor 200', es:'Honor 200', fr:'Honor 200', de:'Honor 200', ru:'Honor 200', zh:'Honor 200', ja:'Honor 200', hi:'Honor 200', pt:'Honor 200', it:'Honor 200', ko:'Honor 200', nl:'Honor 200', el:'Honor 200' },
  sz_instagram_g_nderi: { tr:'Instagram Gönderi', en:'Instagram Post', ar:'Instagram منشور', es:'Instagram Publicación', fr:'Instagram Publication', de:'Instagram Beitrag', ru:'Instagram Пост', zh:'Instagram 帖子', ja:'Instagram 投稿', hi:'Instagram पोस्ट', pt:'Instagram Postagem', it:'Instagram Post', ko:'Instagram 게시물', nl:'Instagram Bericht', el:'Instagram Δημοσίευση' },
  sz_linkedin_g_nderi: { tr:'LinkedIn Gönderi', en:'LinkedIn Post', ar:'LinkedIn منشور', es:'LinkedIn Publicación', fr:'LinkedIn Publication', de:'LinkedIn Beitrag', ru:'LinkedIn Пост', zh:'LinkedIn 帖子', ja:'LinkedIn 投稿', hi:'LinkedIn पोस्ट', pt:'LinkedIn Postagem', it:'LinkedIn Post', ko:'LinkedIn 게시물', nl:'LinkedIn Bericht', el:'LinkedIn Δημοσίευση' },
  cat_print:      { tr:'Baskı & Matbaa (300 DPI)', en:'Print & Press (300 DPI)', ar:'الطباعة (300 DPI)', es:'Impresión (300 DPI)', fr:'Impression (300 DPI)', de:'Druck (300 DPI)', ru:'Печать (300 DPI)', zh:'印刷 (300 DPI)', ja:'印刷 (300 DPI)', hi:'प्रिंट (300 DPI)', pt:'Impressão (300 DPI)', it:'Stampa (300 DPI)', ko:'인쇄 (300 DPI)', nl:'Drukwerk (300 DPI)', el:'Εκτύπωση (300 DPI)' },
  // Progress
  prog_preparing: { tr:'Görseller hazırlanıyor', en:'Preparing images', ar:'جاري تحضير الصور', es:'Preparando imágenes', fr:'Préparation des images', de:'Bilder werden vorbereitet', ru:'Подготовка изображений', zh:'正在准备图片', ja:'画像を準備中', hi:'छवियाँ तैयार हो रही हैं', pt:'Preparando imagens', it:'Preparazione immagini', ko:'이미지 준비 중', nl:'Afbeeldingen voorbereiden', el:'Προετοιμασία εικόνων' },
  prog_zipping:   { tr:'ZIP dosyası oluşturuluyor...', en:'Creating ZIP file...', ar:'جاري إنشاء ملف ZIP...', es:'Creando archivo ZIP...', fr:'Création du fichier ZIP...', de:'ZIP-Datei wird erstellt...', ru:'Создание ZIP-файла...', zh:'正在创建 ZIP 文件...', ja:'ZIPファイルを作成中...', ja:'ZIPファイルを作成中...', hi:'ZIP फ़ाइल बनाई जा रही है...', pt:'Criando arquivo ZIP...', it:'Creazione del file ZIP...', ko:'ZIP 파일 생성 중...', nl:'ZIP-bestand aanmaken...', el:'Δημιουργία αρχείου ZIP...' },
};

// ── Size dataset ─────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'social', labelKey: 'cat_social', icon: '📱',
    sizes: [
      { name: 'Instagram Gönderi', i18nKey: 'sz_instagram_g_nderi',              w: 1080, h: 1080, file: 'Instagram_Gonderi_1080x1080' },
      { name: 'Instagram Dikey Gönderi', i18nKey: 'sz_instagram_dikey_g_nderi',        w: 1080, h: 1350, file: 'Instagram_Dikey_1080x1350' },
      { name: 'Instagram Hikaye / Reels', i18nKey: 'sz_instagram_hikaye_reels',       w: 1080, h: 1920, file: 'Instagram_Hikaye_1080x1920' },
      { name: 'YouTube Kapak / Thumbnail', i18nKey: 'sz_youtube_kapak_thumbnail',      w: 1280, h: 720,  file: 'YouTube_Thumbnail_1280x720' },
      { name: 'YouTube Kanal Banneri', i18nKey: 'sz_youtube_kanal_banneri',          w: 2560, h: 1440, file: 'YouTube_Banner_2560x1440' },
      { name: 'YouTube Profil Fotoğrafı', i18nKey: 'sz_youtube_profil_foto_raf',       w: 800,  h: 800,  file: 'YouTube_Profil_800x800' },
      { name: 'TikTok / Snapchat / WA Durum', i18nKey: 'sz_tiktok_snapchat_wa_durum',  w: 1080, h: 1920, file: 'TikTok_1080x1920' },
      { name: 'X (Twitter) Gönderi', i18nKey: 'sz_x_twitter_g_nderi',           w: 1200, h: 675,  file: 'X_Twitter_Gonderi_1200x675' },
      { name: 'X (Twitter) Kapak', i18nKey: 'sz_x_twitter_kapak',             w: 1500, h: 500,  file: 'X_Twitter_Kapak_1500x500' },
      { name: 'LinkedIn Gönderi', i18nKey: 'sz_linkedin_g_nderi',              w: 1200, h: 627,  file: 'LinkedIn_Gonderi_1200x627' },
      { name: 'LinkedIn Kişisel Kapak', i18nKey: 'sz_linkedin_ki_isel_kapak',        w: 1584, h: 396,  file: 'LinkedIn_Kapak_1584x396' },
      { name: 'Facebook Gönderi', i18nKey: 'sz_facebook_g_nderi',              w: 1200, h: 630,  file: 'Facebook_Gonderi_1200x630' },
      { name: 'Facebook Etkinlik Kapağı', i18nKey: 'sz_facebook_etkinlik_kapa',      w: 1200, h: 628,  file: 'Facebook_Etkinlik_1200x628' },
      { name: 'Pinterest Pin', i18nKey: 'sz_pinterest_pin',                 w: 1000, h: 1500, file: 'Pinterest_Pin_1000x1500' },
      { name: 'Twitch Çevrimdışı Ekranı', i18nKey: 'sz_twitch_evrimd_ekran',      w: 1920, h: 1080, file: 'Twitch_Offline_1920x1080' },
    ]
  },
  {
    id: 'screens', labelKey: 'cat_screens', icon: '🖥️',
    sizes: [
      { name: 'HD Laptop', i18nKey: 'sz_hd_laptop',                     w: 1366, h: 768,  file: 'HD_Laptop_1366x768' },
      { name: 'Full HD Masaüstü', i18nKey: 'sz_full_hd_masa_st',              w: 1920, h: 1080, file: 'FullHD_1920x1080' },
      { name: '2K / QHD Monitör', i18nKey: 'sz_2k_qhd_monit_r',              w: 2560, h: 1440, file: 'QHD_2560x1440' },
      { name: '4K / UHD TV ve Monitör', i18nKey: 'sz_4k_uhd_tv_ve_monit_r',        w: 3840, h: 2160, file: '4K_3840x2160' },
      { name: '8K Ekran', i18nKey: 'sz_8k_ekran',                      w: 7680, h: 4320, file: '8K_7680x4320' },
      { name: 'MacBook Pro 16"', i18nKey: 'sz_macbook_pro_16',               w: 3456, h: 2234, file: 'MacBook_Pro16_3456x2234' },
      { name: 'Standart Akıllı Telefon', i18nKey: 'sz_standart_ak_ll_telefon',       w: 1080, h: 2400, file: 'Telefon_1080x2400' },
      { name: 'iPhone 14/15 Pro Max', i18nKey: 'sz_iphone_14_15_pro_max',          w: 1290, h: 2796, file: 'iPhone15ProMax_1290x2796' },
      { name: 'iPad Pro 12.9" Tablet', i18nKey: 'sz_ipad_pro_12_9_tablet',         w: 2048, h: 2732, file: 'iPad_Pro_2048x2732' },
      { name: 'Akıllı Saat / Apple Watch', i18nKey: 'sz_ak_ll_saat_apple_watch',     w: 368,  h: 448,  file: 'AppleWatch_368x448', risk: true },
      { name: 'iPhone 15 / 14 Pro Max', i18nKey: 'sz_iphone_15_14_pro_max',          w: 1290, h: 2796, file: 'iPhone_ProMax_1290x2796' },
      { name: 'iPhone 15 / 14 / 13 Standart', i18nKey: 'sz_iphone_15_14_13_standart',    w: 1170, h: 2532, file: 'iPhone_Std_1170x2532' },
      { name: 'iPhone 13 Mini / 12 Mini', i18nKey: 'sz_iphone_13_mini_12_mini',        w: 1080, h: 2340, file: 'iPhone_Mini_1080x2340' },
      { name: 'Samsung Galaxy S24 Ultra / S23 Ultra', i18nKey: 'sz_samsung_galaxy_s24_ultra_s23_ultra', w: 1440, h: 3120, file: 'Samsung_Ultra_1440x3120' },
      { name: 'Samsung Galaxy S24 / S23', i18nKey: 'sz_samsung_galaxy_s24_s23',        w: 1080, h: 2340, file: 'Samsung_S24_1080x2340' },
      { name: 'Samsung Galaxy A55 / A54', i18nKey: 'sz_samsung_galaxy_a55_a54',        w: 1080, h: 2340, file: 'Samsung_A55_1080x2340' },
      { name: 'Samsung Galaxy A35 / A25', i18nKey: 'sz_samsung_galaxy_a35_a25',        w: 1080, h: 2340, file: 'Samsung_A35_1080x2340' },
      { name: 'Samsung Galaxy A07', i18nKey: 'sz_samsung_galaxy_a07',              w: 720,  h: 1600, file: 'Samsung_A07_720x1600' },
      { name: 'Samsung Galaxy Z Fold 5 - İç Ekran', i18nKey: 'sz_samsung_galaxy_z_fold_5_i_ekran', w: 1812, h: 2176, file: 'Samsung_ZFold5_1812x2176' },
      { name: 'Xiaomi 14 Pro', i18nKey: 'sz_xiaomi_14_pro',                   w: 1440, h: 3200, file: 'Xiaomi_14Pro_1440x3200' },
      { name: 'Xiaomi Redmi Note 13 Pro', i18nKey: 'sz_xiaomi_redmi_note_13_pro',        w: 1220, h: 2712, file: 'Xiaomi_RedmiNote13Pro_1220x2712' },
      { name: 'Google Pixel 8 Pro', i18nKey: 'sz_google_pixel_8_pro',              w: 1344, h: 2992, file: 'Google_Pixel8Pro_1344x2992' },
      { name: 'Honor 200', i18nKey: 'sz_honor_200',                       w: 1200, h: 2664, file: 'Honor_200_1200x2664' },

    ]
  },
  {
    id: 'ecommerce', labelKey: 'cat_ecommerce', icon: '🛒',
    sizes: [
      { name: 'Amazon/Trendyol Ürün Görseli', i18nKey: 'sz_amazon_trendyol_r_n_g_rseli',  w: 1200, h: 1200, file: 'Urun_Gorseli_1200x1200' },
      { name: 'Etsy Mağaza Kapağı', i18nKey: 'sz_etsy_ma_aza_kapa',            w: 1200, h: 300,  file: 'Etsy_Kapak_1200x300' },
      { name: 'Web Sitesi Favicon', i18nKey: 'sz_web_sitesi_favicon',            w: 512,  h: 512,  file: 'Favicon_512x512', risk: true },
      { name: 'Google Reklam - Leaderboard', i18nKey: 'sz_google_reklam_leaderboard',   w: 728,  h: 90,   file: 'Google_Leaderboard_728x90', risk: true },
      { name: 'Google Reklam - Kare', i18nKey: 'sz_google_reklam_kare',          w: 250,  h: 250,  file: 'Google_Kare_250x250', risk: true },
      { name: 'Google Reklam - Yarım Sayfa', i18nKey: 'sz_google_reklam_yar_m_sayfa',   w: 300,  h: 600,  file: 'Google_YarimSayfa_300x600', risk: true },
    ]
  },
  {
    id: 'print', labelKey: 'cat_print', icon: '🖨️',
    sizes: [
      { name: 'Biyometrik / Vesikalık Fotoğraf', i18nKey: 'sz_biyometrik_vesikal_k_foto_raf', w: 591,  h: 709,   file: 'Vesikalik_591x709', risk: true },
      { name: '10x15 cm Klasik Albüm Baskısı', i18nKey: 'sz_10x15_cm_klasik_alb_m_bask_s', w: 1181, h: 1772,  file: 'Baski_10x15_1181x1772' },
      { name: '13x18 cm Standart Baskı', i18nKey: 'sz_13x18_cm_standart_bask',       w: 1535, h: 2126,  file: 'Baski_13x18_1535x2126' },
      { name: '15x21 cm Büyük Baskı', i18nKey: 'sz_15x21_cm_b_y_k_bask',          w: 1772, h: 2480,  file: 'Baski_15x21_1772x2480' },
      { name: 'Standart Kartvizit', i18nKey: 'sz_standart_kartvizit',            w: 1004, h: 591,   file: 'Kartvizit_1004x591' },
      { name: 'A5 Defter / Kitap', i18nKey: 'sz_a5_defter_kitap',             w: 1748, h: 2480,  file: 'A5_1748x2480' },
      { name: 'A4 Belge / Çıktı', i18nKey: 'sz_a4_belge_kt',             w: 2480, h: 3508,  file: 'A4_2480x3508' },
      { name: 'A3 Küçük Afiş', i18nKey: 'sz_a3_k_k_afi',               w: 3508, h: 4960,  file: 'A3_3508x4960' },
      { name: '35x50 cm Poster / Tablo', i18nKey: 'sz_35x50_cm_poster_tablo',      w: 4134, h: 5906,  file: 'Poster_35x50_4134x5906' },
      { name: '50x70 cm Büyük Tablo', i18nKey: 'sz_50x70_cm_b_y_k_tablo',         w: 5906, h: 8268,  file: 'Tablo_50x70_5906x8268' },
      { name: '70x100 cm Sinema Afişi', i18nKey: 'sz_70x100_cm_sinema_afi_i',       w: 8268, h: 11811, file: 'Afis_70x100_8268x11811' },
    ]
  }
];

// ════════════════════════════════════════════════════════════════════
//  STATE
// ════════════════════════════════════════════════════════════════════
let currentLang   = 'tr';
let sourceImage   = null;   // HTMLImageElement
let sourceFile    = null;   // File
let activeCatId   = 'social';
let customEntries = [];     // { id, w, h, checked, cropData }
// cropData per size: key = `${catId}-${index}` or customEntry.id, value = Cropper cropBoxData + canvasData
let cropDataMap       = {};   // sizeKey -> { x,y,width,height } in source image coords
let originalPreviewSrc = null; // the raw data URL of the loaded image (for preview restore)

// Cropper.js instance
let cropperInstance = null;
let currentCropKey  = null; // which size is being edited

// ════════════════════════════════════════════════════════════════════
//  DOM REFS
// ════════════════════════════════════════════════════════════════════
const htmlEl          = document.documentElement;
const dropZone        = document.getElementById('drop-zone');
const fileInput       = document.getElementById('file-input');
const uploadIdle      = document.getElementById('upload-idle');
const uploadOver      = document.getElementById('upload-over');
const mainPanel       = document.getElementById('main-panel');
const previewImg      = document.getElementById('preview-img');
const infoFilename    = document.getElementById('info-filename');
const infoDims        = document.getElementById('info-dims');
const infoSize        = document.getElementById('info-size');
const convertBtn      = document.getElementById('convert-btn');
const convertIcon     = document.getElementById('convert-icon');
const convertSpinner  = document.getElementById('convert-spinner');
const convertLabel    = document.getElementById('convert-label');
const selectedCount   = document.getElementById('selected-count');
const categoryTabs    = document.getElementById('category-tabs');
const sizePanels      = document.getElementById('size-panels');
const selectAllBtn    = document.getElementById('select-all-btn');
const selectNoneBtn   = document.getElementById('select-none-btn');
const changeImageBtn  = document.getElementById('change-image-btn');
const customWInput    = document.getElementById('custom-w');
const customHInput    = document.getElementById('custom-h');
const addCustomBtn    = document.getElementById('add-custom-btn');
const customEntriesEl = document.getElementById('custom-entries');
const progressOverlay = document.getElementById('progress-overlay');
const progressText    = document.getElementById('progress-text');
const progressBar     = document.getElementById('progress-bar');
const progressFraction= document.getElementById('progress-fraction');
const successToast    = document.getElementById('success-toast');
const toastMessage    = document.getElementById('toast-message');
const errorToast      = document.getElementById('error-toast');
const errorMessage    = document.getElementById('error-message');
const canvas          = document.getElementById('processing-canvas');
const ctx             = canvas.getContext('2d');
const langBtn         = document.getElementById('lang-btn');
const langMenu        = document.getElementById('lang-menu');
const langFlag        = document.getElementById('lang-flag');
const langName        = document.getElementById('lang-name');
const langChevron     = document.getElementById('lang-chevron');
const langList        = document.getElementById('lang-list');
const cropModal       = document.getElementById('crop-modal');
const cropImage       = document.getElementById('crop-image');
const cropModalSubtitle = document.getElementById('crop-modal-subtitle');
const cropCancelBtn   = document.getElementById('crop-cancel-btn');
const cropResetBtn    = document.getElementById('crop-reset-btn');
const cropConfirmBtn  = document.getElementById('crop-confirm-btn');

// ════════════════════════════════════════════════════════════════════
//  i18n HELPERS
// ════════════════════════════════════════════════════════════════════
function t(key) {
  return (T[key] && T[key][currentLang]) || (T[key] && T[key]['en']) || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (T[key]) el.textContent = t(key);
  });

  // Update size names without losing state
  document.querySelectorAll('.size-item').forEach(item => {
    const cb = item.querySelector('input[type="checkbox"]');
    if (!cb) return;
    const key = cb.dataset.key;
    const catId = key.split('_')[0];
    const sIdx = parseInt(key.split('_')[1]);
    const cat = CATEGORIES.find(c => c.id === catId);
    if (cat && cat.sizes[sIdx]) {
      const size = cat.sizes[sIdx];
      const nameEl = item.querySelector('.size-name');
      if (nameEl) {
        if(size.risk) { 
          nameEl.innerHTML = t(size.i18nKey) + ' <span class="w-2 h-2 rounded-full bg-red-500 inline-block ml-1" title="Riskli Boyut"></span>'; 
        } else { 
          nameEl.textContent = t(size.i18nKey); 
        }
      }
      // Also update buttons titles if necessary, though tooltip is generic
    }
  });

  // Update category tab labels
  document.querySelectorAll('.cat-tab').forEach(tab => {
    const catId = tab.dataset.cat;
    const cat = CATEGORIES.find(c => c.id === catId);
    if (cat) {
      tab.innerHTML = `<span>${cat.icon}</span> ${t(cat.labelKey)}`;
    }
  });
  // Update custom-w/h placeholders
  customWInput.placeholder = currentLang === 'ar' ? '٨٠٠' : '800';
  customHInput.placeholder = currentLang === 'ar' ? '٦٠٠' : '600';
}

// ════════════════════════════════════════════════════════════════════
//  RISK TOOLTIP — dynamic popover anchored above the size item
// ════════════════════════════════════════════════════════════════════
let _riskTooltipTimer = null;

function showRiskTooltip(anchorEl) {
  // Remove any existing tooltip
  const existing = document.getElementById('risk-tooltip-popover');
  if (existing) existing.remove();
  if (_riskTooltipTimer) { clearTimeout(_riskTooltipTimer); _riskTooltipTimer = null; }

  // Create tooltip element
  const tip = document.createElement('div');
  tip.id = 'risk-tooltip-popover';
  tip.textContent = t('risk_warning');
  tip.style.cssText = `
    position: absolute;
    z-index: 9999;
    background: linear-gradient(135deg, rgba(30,20,40,0.97) 0%, rgba(20,15,35,0.98) 100%);
    border: 1px solid rgba(139,92,246,0.35);
    border-radius: 12px;
    padding: 10px 14px;
    font-size: 11.5px;
    line-height: 1.55;
    color: #c4b5fd;
    max-width: 280px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.15);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.25s ease;
    white-space: normal;
  `;

  // Small arrow indicator at bottom
  const arrow = document.createElement('div');
  arrow.style.cssText = `
    position: absolute;
    bottom: -5px;
    left: 16px;
    width: 10px;
    height: 10px;
    background: rgba(30,20,40,0.97);
    border-right: 1px solid rgba(139,92,246,0.35);
    border-bottom: 1px solid rgba(139,92,246,0.35);
    transform: rotate(45deg);
  `;
  tip.appendChild(arrow);

  // Position relative to scroll container (the size panels wrapper)
  // Use the anchor element's bounding rect
  document.body.appendChild(tip);

  const anchorRect = anchorEl.getBoundingClientRect();
  const tipWidth = Math.min(280, window.innerWidth - 24);
  tip.style.width = tipWidth + 'px';

  // Compute top/left in viewport coords, then apply as fixed positioning
  tip.style.position = 'fixed';
  let tipLeft = anchorRect.left;
  let tipTop  = anchorRect.top - 8; // will subtract tip height after measure

  // Wait for paint to get real height
  requestAnimationFrame(() => {
    const tipH = tip.offsetHeight;
    tipTop = anchorRect.top - tipH - 8;

    // Clamp to viewport
    if (tipLeft + tipWidth > window.innerWidth - 8) {
      tipLeft = window.innerWidth - tipWidth - 8;
    }
    if (tipLeft < 8) tipLeft = 8;
    if (tipTop < 8) tipTop = anchorRect.bottom + 8; // flip below if no room

    tip.style.left = tipLeft + 'px';
    tip.style.top  = tipTop  + 'px';

    // Reposition arrow horizontally
    const arrowLeft = Math.min(Math.max(anchorRect.left - tipLeft + 12, 12), tipWidth - 22);
    arrow.style.left = arrowLeft + 'px';

    // Fade in
    requestAnimationFrame(() => { tip.style.opacity = '1'; });

    // Auto-dismiss after 2.5 s
    _riskTooltipTimer = setTimeout(() => {
      tip.style.opacity = '0';
      setTimeout(() => { if (tip.parentNode) tip.remove(); }, 280);
    }, 2500);
  });
}

function setLanguage(code) {
  const lang = LANGUAGES.find(l => l.code === code);
  if (!lang) return;
  currentLang = code;

  // Update HTML dir & lang
  htmlEl.lang = code;
  htmlEl.dir  = lang.dir;

  // Update button
  langFlag.textContent = lang.flag;
  langName.textContent = lang.native;

  // Update active item in dropdown
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.code === code);
  });

  applyTranslations();
  closeLanguageMenu();
}

// ════════════════════════════════════════════════════════════════════
//  LANGUAGE DROPDOWN
// ════════════════════════════════════════════════════════════════════
function buildLanguageMenu() {
  langList.innerHTML = '';
  LANGUAGES.forEach(lang => {
    const item = document.createElement('div');
    item.className = `lang-option ${lang.code === currentLang ? 'active' : ''}`;
    item.dataset.code = lang.code;
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', lang.code === currentLang ? 'true' : 'false');
    item.innerHTML = `
      <span class="lang-flag">${lang.flag}</span>
      <span class="lang-label">${lang.name}</span>
      <span class="lang-native">${lang.native}</span>
      <svg class="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    `;
    item.addEventListener('click', () => setLanguage(lang.code));
    langList.appendChild(item);
  });
}

function openLanguageMenu() {
  langMenu.classList.remove('hidden');
  langBtn.setAttribute('aria-expanded', 'true');
  langChevron.style.transform = 'rotate(180deg)';
}

function closeLanguageMenu() {
  langMenu.classList.add('hidden');
  langBtn.setAttribute('aria-expanded', 'false');
  langChevron.style.transform = '';
}

langBtn.addEventListener('click', e => {
  e.stopPropagation();
  langMenu.classList.contains('hidden') ? openLanguageMenu() : closeLanguageMenu();
});

document.addEventListener('click', e => {
  if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
    closeLanguageMenu();
  }
});

// ════════════════════════════════════════════════════════════════════
//  UI BUILD: Category Tabs + Size Panels
// ════════════════════════════════════════════════════════════════════
function buildSizeUI() {
  categoryTabs.innerHTML = '';
  sizePanels.innerHTML   = '';

  CATEGORIES.forEach(cat => {
    // Tab
    const tab = document.createElement('button');
    tab.className = `cat-tab ${cat.id === activeCatId ? 'active' : ''}`;
    tab.dataset.cat = cat.id;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', cat.id === activeCatId ? 'true' : 'false');
    tab.innerHTML = `<span>${cat.icon}</span> ${t(cat.labelKey)}`;
    tab.addEventListener('click', () => switchTab(cat.id));
    categoryTabs.appendChild(tab);

    // Panel
    const panel = document.createElement('div');
    panel.id = `panel-${cat.id}`;
    panel.className = `size-panel ${cat.id === activeCatId ? 'active' : ''}`;
    panel.setAttribute('role', 'tabpanel');

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 sm:grid-cols-2 gap-2';

    cat.sizes.forEach((size, i) => {
      const key = `${cat.id}-${i}`;
      grid.appendChild(createSizeItem(size, key));
    });

    panel.appendChild(grid);
    sizePanels.appendChild(panel);
  });

  updateCount();
}

function createSizeItem(size, key) {
  const label = document.createElement('label');
  label.className = 'size-item';
  label.htmlFor = `chk-${key}`;

  // Checkbox
  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.id   = `chk-${key}`;
  cb.dataset.key  = key;
  cb.dataset.w    = size.w;
  cb.dataset.h    = size.h;
  cb.dataset.risk = size.risk ? "true" : "false";
  cb.dataset.file = size.file;
  cb.addEventListener('change', () => {
    label.classList.toggle('checked', cb.checked);
    if (cb.checked && size.risk) {
      showRiskTooltip(label);
    }
    updateCount();
  });

  // Dynamic preview on click — show how image looks at this ratio
  label.addEventListener('mousedown', e => {
    // Don't interfere with crop button clicks
    if (e.target.closest('.crop-btn')) return;
    updateDynamicPreview(size.w, size.h, key);
  });

  // Name
  const nameEl = document.createElement('span');
  nameEl.className = 'size-name';
  if(size.risk) { nameEl.innerHTML = t(size.i18nKey) + ' <span class="w-2 h-2 rounded-full bg-red-500 inline-block ml-1" title="Riskli Boyut"></span>'; } else { nameEl.textContent = t(size.i18nKey); }

  // Dims
  const dimsEl = document.createElement('span');
  dimsEl.className = 'size-dims';
  dimsEl.textContent = `${size.w} × ${size.h}`;

  // Crop button
  const cropBtn = createCropButton(key, size.w, size.h, t(size.i18nKey));

  // Individual download button
  const dlBtn = createDownloadButton(key, size.w, size.h, size.file, t(size.i18nKey));

  label.appendChild(cb);
  label.appendChild(nameEl);
  label.appendChild(dimsEl);
  label.appendChild(cropBtn);
  label.appendChild(dlBtn);
  return label;
}

function createCropButton(key, w, h, label) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `crop-btn ${cropDataMap[key] ? 'has-crop' : ''}`;
  btn.title = t('crop_btn_tooltip');
  btn.dataset.key = key;
  btn.dataset.w = w;
  btn.dataset.h = h;
  btn.dataset.label = label;
  btn.innerHTML = `
    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 2v14a2 2 0 002 2h14M2 6h14a2 2 0 012 2v14" />
    </svg>
    <span class="crop-dot"></span>
  `;
  btn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    openCropModal(key, w, h, label);
  });
  return btn;
}

function createDownloadButton(key, w, h, filename, label) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'dl-single-btn';
  btn.title = `${label} (${w}×${h}) indirmek için tıkla`;
  btn.dataset.key = key;
  btn.innerHTML = `
    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  `;
  btn.addEventListener('click', async e => {
    e.preventDefault();
    e.stopPropagation();
    await downloadSingle(key, w, h, filename);
  });
  return btn;
}

async function downloadSingle(key, w, h, filename) {
  if (!sourceImage) { showError(t('err_no_image')); return; }
  const btn = document.querySelector(`.dl-single-btn[data-key="${key}"]`);
  if (btn) { btn.disabled = true; btn.classList.add('loading'); }
  try {
    const blob = await processTarget({ key, w, h, file: filename });
    const safeName = filename
      .replace(/[^a-zA-Z0-9à-ÿĀ-ſ_\-]/g, '_')
      .replace(/__+/g, '_');
    saveAs(blob, `${safeName}_${w}x${h}.jpg`);
    showSuccess(`✓ ${filename.replace(/_/g,' ')} (${w}×${h})`);
  } catch (err) {
    console.error(err);
    showError(t('err_convert'));
  } finally {
    if (btn) { btn.disabled = false; btn.classList.remove('loading'); }
  }
}


function switchTab(catId) {
  activeCatId = catId;
  document.querySelectorAll('.cat-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.cat === catId);
    t.setAttribute('aria-selected', t.dataset.cat === catId ? 'true' : 'false');
  });
  document.querySelectorAll('.size-panel').forEach(p => {
    p.classList.toggle('active', p.id === `panel-${catId}`);
  });
}

// ════════════════════════════════════════════════════════════════════
//  CROP MODAL (Cropper.js)
// ════════════════════════════════════════════════════════════════════
function openCropModal(key, w, h, label) {
  if (!sourceImage) {
    showError(t('err_no_image'));
    return;
  }

  currentCropKey = key;

  // Set subtitle
  cropModalSubtitle.textContent = `${label} — ${w} × ${h} px`;

  // Set image src
  cropImage.src = sourceImage.src;
  cropImage.onload = () => {
    // Destroy previous instance
    if (cropperInstance) {
      cropperInstance.destroy();
      cropperInstance = null;
    }

    // Init Cropper.js
    cropperInstance = new Cropper(cropImage, {
      viewMode: 1, // Restrict crop box to not exceed image canvas
      aspectRatio: w / h,
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 0.85,
      restore: false,
      guides: true,
      center: true,
      highlight: false,
      cropBoxMovable: true,
      cropBoxResizable: true,
      toggleDragModeOnDblclick: false,
      background: true,
      ready() {
        // If previous crop data exists for this key, restore it
        if (cropDataMap[key]) {
          cropperInstance.setData(cropDataMap[key]);
        }
      }
    });
  };

  // Trigger load if src already same
  if (cropImage.complete) {
    cropImage.dispatchEvent(new Event('load'));
  }

  cropModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCropModal() {
  cropModal.classList.add('hidden');
  document.body.style.overflow = '';
  if (cropperInstance) {
    cropperInstance.destroy();
    cropperInstance = null;
  }
  currentCropKey = null;
}

cropCancelBtn.addEventListener('click', closeCropModal);
// Backdrop click intentionally disabled — user must use Cancel/Confirm buttons
// Prevent drag events from bubbling to backdrop and accidentally closing the modal
cropModal.addEventListener('mousedown', e => { e.stopPropagation(); });
cropModal.addEventListener('touchstart', e => { e.stopPropagation(); }, { passive: true });
const cropModalInner = cropModal.querySelector('.crop-modal-inner, [class*="bg-gray"], div');
if (cropModalInner) {
  cropModalInner.addEventListener('mousedown', e => e.stopPropagation());
  cropModalInner.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
}

cropResetBtn.addEventListener('click', () => {
  if (cropperInstance) cropperInstance.reset();
  if (currentCropKey) {
    delete cropDataMap[currentCropKey];
    refreshCropButton(currentCropKey);
  }
});

cropConfirmBtn.addEventListener('click', () => {
  if (!cropperInstance || !currentCropKey) return;

  // Get crop data in original image coordinates
  const data = cropperInstance.getData(true); // true = round to int
  cropDataMap[currentCropKey] = data;

  // Update the crop button visual
  refreshCropButton(currentCropKey);

  // Refresh the dynamic preview with the new manual crop data
  const cropBtn = document.querySelector(`.crop-btn[data-key="${currentCropKey}"]`);
  if (cropBtn) {
    updateDynamicPreview(parseInt(cropBtn.dataset.w), parseInt(cropBtn.dataset.h), currentCropKey);
  }

  closeCropModal();
  showSuccess(t('crop_set_label') + ` ✓`);
});

function refreshCropButton(key) {
  const btn = document.querySelector(`.crop-btn[data-key="${key}"]`);
  if (!btn) return;
  const hasCrop = !!cropDataMap[key];
  btn.classList.toggle('has-crop', hasCrop);
}

// ════════════════════════════════════════════════════════════════════
//  FILE HANDLING
// ════════════════════════════════════════════════════════════════════
function handleFile(file) {
  if (!file) return;
  if (!file.type.startsWith('image/')) { showError(t('err_invalid_file')); return; }
  if (file.size > 50 * 1024 * 1024)   { showError(t('err_file_size'));    return; }

  sourceFile = file;
  // Reset crop data when new image loaded
  cropDataMap = {};
  document.querySelectorAll('.crop-btn.has-crop').forEach(b => b.classList.remove('has-crop'));

  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      sourceImage = img;
      originalPreviewSrc = e.target.result;
      previewImg.src = originalPreviewSrc;
      // Reset preview badge
      const badge = document.getElementById('preview-ratio-badge');
      if (badge) badge.textContent = `${img.naturalWidth} × ${img.naturalHeight} px`;
      infoFilename.textContent = file.name;
      infoDims.textContent = `${img.naturalWidth} × ${img.naturalHeight} px`;
      infoSize.textContent = formatBytes(file.size);
      mainPanel.classList.remove('hidden');
      mainPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      updateCount();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function formatBytes(bytes) {
  if (bytes < 1024)          return bytes + ' B';
  if (bytes < 1024 * 1024)  return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

// ════════════════════════════════════════════════════════════════════
//  DRAG & DROP
// ════════════════════════════════════════════════════════════════════
dropZone.addEventListener('dragenter', e => { e.preventDefault(); showDropOver(true); });
dropZone.addEventListener('dragover',  e => { e.preventDefault(); showDropOver(true); });
dropZone.addEventListener('dragleave', e => { if (!dropZone.contains(e.relatedTarget)) showDropOver(false); });
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  showDropOver(false);
  handleFile(e.dataTransfer.files[0]);
});
dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') fileInput.click(); });
fileInput.addEventListener('change', () => handleFile(fileInput.files[0]));
changeImageBtn.addEventListener('click', () => fileInput.click());

function showDropOver(show) {
  uploadIdle.classList.toggle('hidden', show);
  uploadOver.classList.toggle('hidden', !show);
  dropZone.classList.toggle('drag-over', show);
}

// ════════════════════════════════════════════════════════════════════
//  SELECTION
// ════════════════════════════════════════════════════════════════════
function updateCount() {
  const targets = getSelectedTargets();
  selectedCount.textContent = targets.length;
  // risk-warning is now handled by per-item tooltip; no global banner needed
  convertBtn.disabled = targets.length === 0;
}

function getSelectedTargets() {
  const targets = [];
  document.querySelectorAll('#size-panels input[type="checkbox"]:checked').forEach(cb => {
    targets.push({
      key:  cb.dataset.key,
      w:    parseInt(cb.dataset.w),
      h:    parseInt(cb.dataset.h),
      file: cb.dataset.file,
    });
  });
  customEntries.filter(e => e.checked).forEach(e => {
    targets.push({ key: e.id, w: e.w, h: e.h, file: `Ozel_Boyut_${e.w}x${e.h}` });
  });
  return targets;
}

selectAllBtn.addEventListener('click', () => {
  // Only select items in the ACTIVE category panel
  const activePanel = document.getElementById(`panel-${activeCatId}`);
  if (activePanel) {
    activePanel.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.checked = true;
      const label = cb.closest('.size-item');
      if (label) label.classList.add('checked');
    });
  }
  // If on Custom tab, select all custom entries
  if (activeCatId === 'custom') {
    customEntries.forEach(e => { e.checked = true; });
    renderCustomEntries();
  }
  updateCount();
});

selectNoneBtn.addEventListener('click', () => {
  document.querySelectorAll('#size-panels input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
    const label = cb.closest('.size-item');
    if (label) label.classList.remove('checked');
  });
  customEntries.forEach(e => { e.checked = false; });
  renderCustomEntries();
  updateCount();
});

// ════════════════════════════════════════════════════════════════════
//  CUSTOM SIZE
// ════════════════════════════════════════════════════════════════════
addCustomBtn.addEventListener('click', addCustomSize);
[customWInput, customHInput].forEach(inp => {
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') addCustomSize(); });
});

function addCustomSize() {
  const w = parseInt(customWInput.value);
  const h = parseInt(customHInput.value);
  if (!w || !h || w < 1 || h < 1 || w > 20000 || h > 20000) {
    showError(t('err_custom_vals')); return;
  }
  if (customEntries.some(e => e.w === w && e.h === h)) {
    showError(t('err_duplicate')); return;
  }
  const id = `custom-${Date.now()}`;
  customEntries.push({ id, w, h, checked: true });
  customWInput.value = '';
  customHInput.value = '';
  renderCustomEntries();
  updateCount();
}

function renderCustomEntries() {
  customEntriesEl.innerHTML = '';
  customEntries.forEach(entry => {
    const row = document.createElement('div');
    row.className = `custom-entry ${entry.checked ? 'checked' : ''}`;

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = entry.checked;
    cb.addEventListener('change', () => {
      entry.checked = cb.checked;
      row.classList.toggle('checked', cb.checked);
      updateCount();
    });

    const lbl = document.createElement('span');
    lbl.className = 'entry-label';
    lbl.textContent = t('custom_size_title').split('(')[0].trim();

    const dims = document.createElement('span');
    dims.className = 'entry-dims';
    dims.textContent = `${entry.w} × ${entry.h} px`;

    // Crop button for custom entry
    const cropBtn = createCropButton(entry.id, entry.w, entry.h, `${entry.w}×${entry.h}`);
    cropBtn.style.width  = '24px';
    cropBtn.style.height = '24px';

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.title = '×';
    removeBtn.innerHTML = '×';
    removeBtn.addEventListener('click', () => {
      customEntries = customEntries.filter(e => e.id !== entry.id);
      delete cropDataMap[entry.id];
      renderCustomEntries();
      updateCount();
    });

    row.appendChild(cb);
    row.appendChild(lbl);
    row.appendChild(dims);
    row.appendChild(cropBtn);
    row.appendChild(removeBtn);
    customEntriesEl.appendChild(row);
  });
}

// ════════════════════════════════════════════════════════════════════
//  IMAGE PROCESSING
// ════════════════════════════════════════════════════════════════════

/**
 * Center-crop (object-fit: cover) — Yüksek Kalite ve Doğru Matematik
 */
function centerCropProcess(targetW, targetH) {
  return new Promise(resolve => {
    const imgW = sourceImage.naturalWidth;
    const imgH = sourceImage.naturalHeight;
    
    // 1. Kusursuz Kırpma (Cover) Matematiği
    const scale = Math.max(targetW / imgW, targetH / imgH);
    const sWidth = targetW / scale;
    const sHeight = targetH / scale;
    const sx = (imgW - sWidth) / 2;
    const sy = (imgH - sHeight) / 2;

    // 2. Canvas Ayarları
    canvas.width = targetW;
    canvas.height = targetH;
    
    // Yüksek Kaliteli Küçültme (Anti-Aliasing)
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, targetW, targetH);

    // 3. Görüntüyü Çiz
    ctx.drawImage(
      sourceImage,
      sx, sy, sWidth, sHeight,
      0, 0, targetW, targetH
    );
    
    // 4. Kalite Kayıpsız Çıktı (%100 Kalite)
    canvas.toBlob(blob => resolve(blob), 'image/jpeg', 1.0);
  });
}

/**
 * Manual-crop mode — uses stored Cropper.js data
 */
function manualCropProcess(targetW, targetH, cropData) {
  return new Promise(resolve => {
    canvas.width = targetW;
    canvas.height = targetH;
    
    // Yüksek Kaliteli Küçültme (Anti-Aliasing)
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, targetW, targetH);

    // Seçili alanı (cropData) hedefe çiz
    ctx.drawImage(
      sourceImage,
      cropData.x, cropData.y,
      cropData.width, cropData.height,
      0, 0, targetW, targetH
    );
    
    // Kalite Kayıpsız Çıktı (%100 Kalite)
    canvas.toBlob(blob => resolve(blob), 'image/jpeg', 1.0);
  });
}

/**
 * Dynamic Preview: instantly renders a thumbnail of the source image
 * cropped to the given aspect ratio (w:h), updating the preview card.
 */
function updateDynamicPreview(w, h, key) {
  if (!sourceImage) return;

  // Max preview canvas dimension (keeps it fast)
  const MAX = 480;
  const scale = Math.min(MAX / w, MAX / h, 1);
  const pw = Math.max(1, Math.round(w * scale));
  const ph = Math.max(1, Math.round(h * scale));

  // Use a dedicated offscreen canvas
  const off = document.createElement('canvas');
  off.width  = pw;
  off.height = ph;
  const octx = off.getContext('2d');

  const cropData = cropDataMap[key];
  if (cropData) {
    // Manual crop mode — use stored Cropper.js region
    octx.drawImage(
      sourceImage,
      cropData.x, cropData.y, cropData.width, cropData.height,
      0, 0, pw, ph
    );
  } else {
    // Center-crop (object-fit: cover)
    const imgW = sourceImage.naturalWidth;
    const imgH = sourceImage.naturalHeight;
    const ratio = Math.max(pw / imgW, ph / imgH);
    const sw = pw / ratio;
    const sh = ph / ratio;
    const sx = (imgW - sw) / 2;
    const sy = (imgH - sh) / 2;
    octx.drawImage(sourceImage, sx, sy, sw, sh, 0, 0, pw, ph);
  }

  previewImg.src = off.toDataURL('image/jpeg', 0.88);

  // Update the preview badge
  const badge = document.getElementById('preview-ratio-badge');
  const hasCrop = !!cropDataMap[key];
  if (badge) badge.textContent = `${w} × ${h}${hasCrop ? ' ✓' : ''}`;
}

async function processTarget(target) {
  const cropData = cropDataMap[target.key];
  if (cropData) {
    return manualCropProcess(target.w, target.h, cropData);
  }
  return centerCropProcess(target.w, target.h);
}

// ════════════════════════════════════════════════════════════════════
//  CONVERT & DOWNLOAD
// ════════════════════════════════════════════════════════════════════
convertBtn.addEventListener('click', async () => {
  if (!sourceImage) { showError(t('err_no_image')); return; }

  const targets = getSelectedTargets();
  if (targets.length === 0) { showError(t('err_no_selection')); return; }

  setConverting(true);
  showProgress(true);
  updateProgress(0, targets.length, t('prog_preparing'));

  try {
    const zip    = new JSZip();
    const folder = zip.folder('BoyutLand_Export');

    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      updateProgress(i, targets.length, `${target.file}...`);
      await new Promise(r => setTimeout(r, 12));  // yield to UI

      const blob = await processTarget(target);
      // Smart naming: PlatformName_WxH.jpg
      const safeName = target.file
        .replace(/[^a-zA-Z0-9à-ÿĀ-ſ_\-]/g, '_')
        .replace(/__+/g, '_');
      folder.file(`${safeName}_${target.w}x${target.h}.jpg`, blob);
      updateProgress(i + 1, targets.length, `${target.file} ✓`);
    }

    updateProgress(targets.length, targets.length, t('prog_zipping'));
    await new Promise(r => setTimeout(r, 80));

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'uyumlu-gorseller.zip');

    showProgress(false);
    setConverting(false);
    showSuccess(t('success_zip'));

  } catch (err) {
    console.error(err);
    showProgress(false);
    setConverting(false);
    showError(t('err_convert'));
  }
});

// ════════════════════════════════════════════════════════════════════
//  UI HELPERS
// ════════════════════════════════════════════════════════════════════
function setConverting(state) {
  convertBtn.disabled = state;
  convertIcon.classList.toggle('hidden', state);
  convertSpinner.classList.toggle('hidden', !state);
  convertLabel.textContent = state ? t('converting') : t('convert_btn');
}

function showProgress(show) {
  progressOverlay.classList.toggle('hidden', !show);
}

function updateProgress(done, total, text) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  progressBar.style.width = pct + '%';
  progressText.textContent = text;
  progressFraction.textContent = `${done} / ${total}`;
}

let toastTimer = null;
function showSuccess(msg) {
  errorToast.classList.add('hidden');
  toastMessage.textContent = msg;
  successToast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => successToast.classList.add('hidden'), 4500);
}

function showError(msg) {
  successToast.classList.add('hidden');
  errorMessage.textContent = msg;
  errorToast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => errorToast.classList.add('hidden'), 5500);
}

// ════════════════════════════════════════════════════════════════════
//  BOOT
// ════════════════════════════════════════════════════════════════════
buildLanguageMenu();
buildSizeUI();
applyTranslations();
updateCount();


// ── Logo Click Handler ──────────────────────────────────────────────
window.handleLogoClick = function() {
  if (sourceImage) {
    if (confirm(T.confirm_reset ? (T.confirm_reset[currentLang] || T.confirm_reset['en']) : "Devam eden işlemleriniz kaybolacak. Ana sayfaya dönmek istediğinize emin misiniz?")) {
      location.reload();
    }
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

}); // End of DOMContentLoaded
