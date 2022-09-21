function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {pageLanguage: 'en', includedLanguages: 'en,fr,de,ja,sv,es'},
        'google_translate_element'
    );
}

var flags = document.getElementsByClassName('flag_link');
Array.prototype.forEach.call(flags, function(e){
    e.addEventListener('click', function(f){
        f.preventDefault();
        var lang = e.getAttribute('data-lang');
        var languageSelect = document.querySelector("select.goog-te-combo");
        languageSelect.value = lang;
        if(lang === 'ja') {
            window.open("https://hindujatech.jp/", "_blank");
        } else {
            languageSelect.dispatchEvent(new Event("change"));
        }
    }); 
});
