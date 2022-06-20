export const messageTemplate = (companyName, languages) => {
  const finnish = `<p>Kiitämme sinua mielenkiinnostasi työskennellä yrityksessä ${companyName}. Olemme vastaanottaneet hakemuksesi ja tulemme arvioimaan osaamistaustasi kyseiseen tehtävään. Mikäli arvioimme, että osaamisesi sopii haettuun tehtävään, otamme sinuun yhteyttä. Tällä välin toivotamme sinulle onnea työnhakuun ja tulevalle urallesi!</p> <p><br></p> <p>Ystävällisin terveisin,</p> <p>${companyName}</p> <p><br></p>`;
  const english = `<p>Thank you for your interest to work at ${companyName}. We have successfully received your application and we are going to assess your qualifications for
  the position. You will be contacted by our company if your skill sets match our needs. In the meantime, we would like to wish you the very best in your
  career search.</p> <p><br></p> <p>Regards</p> <p>${companyName}</p><p><br></p>`;
  const swedish = `<p>Tack för ditt intresse att arbeta hos ${companyName}. Vi har tagit emot din ansökan och vi kommer att gå genom dina kvalifikationer för tjänsten. Vi
  kommer att kontakta dig om dina färdigheter matchar vårt företag. Under tiden vill vi önska dig det allra bästa i ditt karriärsökande.</p> <p><br></p> <p>Hälsningar</p> <p>${companyName}</p> <p><br></p>`;
  const estonian = `<p>Täname Teid huvi eest töötada ettevõttes ${companyName}. Oleme Teie avalduse edukalt vastu võtnud ja anname omapoolse hinnagu Teie kvalifikatsioonile
  antud ametikohale. Võtame Teiega peagi uuesti ühendust, kui Teie oskused vastavad meie vajadustele. Seniks soovime Teile edu karjääriotsinguil.</p><p><br></p><p>Lugupidamisega</p><p>${companyName}</p> <p><br></p>`;

  const templates = [
    {
      language: 'finnish',
      message: finnish,
    },
    {
      language: 'english',
      message: english,
    },
    {
      language: 'swedish',
      message: swedish,
    },
    {
      language: 'estonian',
      message: estonian,
    },
  ];

  const selectedLanguages = languages?.map(lang => lang.type);

  const defaultTemplate = selectedLanguages?.map(lang => {
    const index = templates.findIndex(template => template.language === lang);
    console.log('defaultTemplate', index);
    return templates[index].message;
  });

  console.log('join', defaultTemplate.join(''));
  return defaultTemplate.join('');
};
