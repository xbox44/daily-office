window.LITURGY = (function () {
  const LORDS_PRAYER =
    "Our Father, which art in heaven, Hallowed be thy Name. Thy kingdom come. Thy will be done in earth, as it is in heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive them that trespass against us. And lead us not into temptation; But deliver us from evil. For thine is the kingdom, the power, and the glory, For ever and ever. Amen.";

  const APOSTLES_CREED =
    "I believe in God the Father Almighty, Maker of heaven and earth: And in Jesus Christ his only Son our Lord, Who was conceived by the Holy Ghost, Born of the Virgin Mary, Suffered under Pontius Pilate, Was crucified, dead, and buried: He descended into hell; The third day he rose again from the dead; He ascended into heaven, And sitteth on the right hand of God the Father Almighty; From thence he shall come to judge the quick and the dead. I believe in the Holy Ghost; The holy Catholick Church; The Communion of Saints; The Forgiveness of sins; The Resurrection of the body, And the Life everlasting. Amen.";

  const VOTUM = "Our help is in the name of the Lord, who made heaven and earth.";

  const BCP_EXHORTATION =
    "Dearly beloved brethren, the Scripture moveth us, in sundry places, to acknowledge and confess our manifold sins and wickedness; and that we should not dissemble nor cloak them before the face of Almighty God our heavenly Father; but confess them with an humble, lowly, penitent, and obedient heart; to the end that we may obtain forgiveness of the same, by his infinite goodness and mercy. And although we ought at all times humbly to acknowledge our sins before God; yet ought we most chiefly so to do, when we assemble and meet together to render thanks for the great benefits that we have received at his hands, to set forth his most worthy praise, to hear his most holy Word, and to ask those things which are requisite and necessary, as well for the body as the soul. Wherefore I pray and beseech you, as many as are here present, to accompany me with a pure heart, and humble voice, unto the throne of the heavenly grace, saying after me;";

  const BCP_CONFESSION =
    "Almighty and most merciful Father; We have erred, and strayed from thy ways like lost sheep. We have followed too much the devices and desires of our own hearts. We have offended against thy holy laws. We have left undone those things which we ought to have done; And we have done those things which we ought not to have done; And there is no health in us. But thou, O Lord, have mercy upon us, miserable offenders. Spare thou them, O God, which confess their faults. Restore thou them that are penitent; According to thy promises declared unto mankind in Christ Jesu our Lord. And grant, O most merciful Father, for his sake; That we may hereafter live a godly, righteous, and sober life, To the glory of thy holy Name. Amen.";

  const MIDDELBURG_CONFESSION =
    "O God our heavenly Father, we acknowledge and confess that we are not worthy to lift up our eyes to heaven, much less to present ourselves before thy Majesty: for our consciences accuse us, and our sins witness against us. Yet, O Lord, because it hath pleased thee of thy infinite mercy to command us to call upon thee, even from the deep of our tribulations, we, miserable sinners, groan and cry unto thee. Forget our offences, and be merciful unto us. For the love of Jesus Christ, wash us from our iniquities, and daily increase in us the graces of thy Holy Spirit, that we may grow in all righteousness, to the glory of thy Name, through Jesus Christ our Lord. Amen.";

  const PARDON =
    "Almighty God, the Father of our Lord Jesus Christ, who desireth not the death of a sinner, but rather that he may turn from his wickedness, and live; have mercy upon us; pardon and deliver us from all our sins; confirm and strengthen us in all goodness; and bring us to everlasting life; through Jesus Christ our Lord. Amen.";

  const COLLECT_GRACE =
    "O Lord, our heavenly Father, Almighty and everlasting God, who hast safely brought us to the beginning of this day; Defend us in the same with thy mighty power; and grant that this day we fall into no sin, neither run into any kind of danger; but that all our doings may be ordered by thy governance, to do always that is righteous in thy sight; through Jesus Christ our Lord. Amen.";

  const COLLECT_PEACE =
    "O God, who art the author of peace and lover of concord, in knowledge of whom standeth our eternal life, whose service is perfect freedom; Defend us thy humble servants in all assaults of our enemies; that we, surely trusting in thy defence, may not fear the power of any adversaries, through the might of Jesus Christ our Lord. Amen.";

  const COLLECT_PERILS =
    "Lighten our darkness, we beseech thee, O Lord; and by thy great mercy defend us from all perils and dangers of this night; for the love of thy only Son, our Saviour, Jesus Christ. Amen.";

  const COLLECT_NOON =
    "Blessed Saviour, who at this hour didst hang upon the cross, stretching forth thy loving arms; Grant that all mankind may look unto thee and be saved; and let thy Holy Spirit order our steps, that we may walk as children of the day; through the same Jesus Christ our Lord. Amen.";

  const ILLUMINATION =
    "Almighty God, we beseech thee to illuminate our minds by thy Holy Spirit, that we may understand the Scriptures, and receive them not as the word of men, but as they are indeed, the Word of God; that they may be in us as a seed of eternal life. Through Jesus Christ our Lord. Amen.";

  const INTERCESSIONS = [
    "Almighty God, who hast promised to hear the petitions of them that ask in thy Son's Name; We pray for the whole congregation of Christ's Church, that all who confess thy holy Name may agree in the truth of thy holy Word, and live in unity and godly love.",
    "We pray for all Christian rulers and magistrates, that they may truly and indifferently minister justice, to the punishment of wickedness and vice, and to the maintenance of thy true religion and virtue. (Westminster Confession, chapter 23.)",
    "We pray for all pastors and teachers, that they may both by their life and doctrine set forth thy true and lively Word, and rightly and duly administer thy holy Sacraments.",
    "We pray for this household, and for all who are dear to us, that they may be kept in body and soul, and walk in thy fear all their days.",
    "We pray for all who travel, for the sick, the poor, the prisoner, and the dying, that it may please thee to succour, help, and comfort all that are in danger, necessity, and tribulation.",
    "We pray for the conversion of the nations, and for the peace of Jerusalem, that thy gospel may have free course and be glorified."
  ];

  const THANKS =
    "Almighty God, Father of all mercies, we thine unworthy servants do give thee most humble and hearty thanks for all thy goodness and loving-kindness to us, and to all men. We bless thee for our creation, preservation, and all the blessings of this life; but above all, for thine inestimable love in the redemption of the world by our Lord Jesus Christ; for the means of grace, and for the hope of glory. And, we beseech thee, give us that due sense of all thy mercies, that our hearts may be unfeignedly thankful, and that we shew forth thy praise, not only with our lips, but in our lives; through Jesus Christ our Lord. Amen.";

  const GRACE = "The grace of our Lord Jesus Christ, and the love of God, and the fellowship of the Holy Ghost, be with us all evermore. Amen.";

  const AARON = "The Lord bless us, and keep us: the Lord make his face to shine upon us, and be gracious unto us: the Lord lift up his countenance upon us, and give us peace. Amen.";

  const HEIDELBERG_1 = {
    q: "What is thy only comfort in life and in death?",
    a: "That I, with body and soul, both in life and in death, am not my own, but belong unto my faithful Saviour Jesus Christ; who with his precious blood hath fully satisfied for all my sins, and delivered me from all the power of the devil; and so preserves me that without the will of my heavenly Father not a hair can fall from my head; yea, that all things must be subservient to my salvation. Wherefore, by his Holy Spirit, he also assures me of eternal life, and makes me sincerely willing and ready, henceforth, to live unto him."
  };

  const SENTENCES = {
    advent: [
      { ref: "Mark 1:3", text: "The voice of one crying in the wilderness, Prepare ye the way of the Lord, make his paths straight." },
      { ref: "Romans 13:11", text: "Now it is high time to awake out of sleep: for now is our salvation nearer than when we believed." }
    ],
    christmas: [
      { ref: "Luke 2:10-11", text: "Behold, I bring you good tidings of great joy, which shall be to all people. For unto you is born this day in the city of David a Saviour, which is Christ the Lord." },
      { ref: "John 1:14", text: "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth." }
    ],
    epiphany: [
      { ref: "Malachi 1:11", text: "From the rising of the sun even unto the going down of the same my Name shall be great among the Gentiles." },
      { ref: "Isaiah 60:1", text: "Arise, shine; for thy light is come, and the glory of the Lord is risen upon thee." }
    ],
    lent: [
      { ref: "Joel 2:13", text: "Rend your heart, and not your garments, and turn unto the Lord your God: for he is gracious and merciful, slow to anger, and of great kindness." },
      { ref: "Psalm 51:17", text: "The sacrifices of God are a broken spirit: a broken and a contrite heart, O God, thou wilt not despise." }
    ],
    easter: [
      { ref: "1 Corinthians 15:20", text: "Christ is risen from the dead, and become the firstfruits of them that slept." },
      { ref: "Romans 6:9", text: "Christ being raised from the dead dieth no more; death hath no more dominion over him." }
    ],
    pentecost: [
      { ref: "Acts 2:4", text: "They were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance." },
      { ref: "John 14:26", text: "The Comforter, which is the Holy Ghost, whom the Father will send in my name, he shall teach you all things." }
    ],
    trinity: [
      { ref: "Revelation 4:8", text: "Holy, holy, holy, Lord God Almighty, which was, and is, and is to come." },
      { ref: "Matthew 28:19", text: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost." }
    ],
    ordinary: [
      { ref: "Psalm 51:15", text: "O Lord, open thou our lips; and our mouth shall shew forth thy praise." },
      { ref: "Habakkuk 2:20", text: "The Lord is in his holy temple: let all the earth keep silence before him." },
      { ref: "Philippians 1:2", text: "Grace be unto you, and peace, from God our Father, and from the Lord Jesus Christ." },
      { ref: "Psalm 43:3", text: "O send out thy light and thy truth, that they may lead me." }
    ]
  };

  const COLLECTS = {
    advent: "Almighty God, give us grace that we may cast away the works of darkness, and put upon us the armour of light, now in the time of this mortal life, in which thy Son Jesus Christ came to visit us in great humility; that in the last day, when he shall come again in his glorious Majesty, we may rise to the life immortal; through him who liveth and reigneth with thee and the Holy Ghost, now and ever. Amen.",
    christmas: "Almighty God, who hast given us thy only-begotten Son to take our nature upon him, and as at this time to be born of a pure Virgin; Grant that we being regenerate, and made thy children by adoption and grace, may daily be renewed by thy Holy Spirit; through the same our Lord Jesus Christ. Amen.",
    epiphany: "O God, who by the leading of a star didst manifest thy only-begotten Son to the Gentiles; Mercifully grant, that we, which know thee now by faith, may after this life have the fruition of thy glorious Godhead; through Jesus Christ our Lord. Amen.",
    ash: "Almighty and everlasting God, who hatest nothing that thou hast made, and dost forgive the sins of all them that are penitent; Create and make in us new and contrite hearts, that we worthily lamenting our sins, and acknowledging our wretchedness, may obtain of thee, the God of all mercy, perfect remission and forgiveness; through Jesus Christ our Lord. Amen.",
    lent: "Almighty God, who seest that we have no power of ourselves to help ourselves; Keep us both outwardly in our bodies, and inwardly in our souls; that we may be defended from all adversities which may happen to the body, and from all evil thoughts which may assault and hurt the soul; through Jesus Christ our Lord. Amen.",
    palm: "Almighty and everlasting God, who, of thy tender love towards mankind, hast sent thy Son, our Saviour Jesus Christ, to take upon him our flesh, and to suffer death upon the cross, that all mankind should follow the example of his great humility; Mercifully grant, that we may both follow the example of his patience, and also be made partakers of his resurrection; through the same Jesus Christ our Lord. Amen.",
    easter: "Almighty God, who through thine only-begotten Son Jesus Christ hast overcome death, and opened unto us the gate of everlasting life; We humbly beseech thee, that, as by thy special grace preventing us thou dost put into our minds good desires, so by thy continual help we may bring the same to good effect; through Jesus Christ our Lord. Amen.",
    ascension: "Grant, we beseech thee, Almighty God, that like as we do believe thy only-begotten Son our Lord Jesus Christ to have ascended into the heavens; so we may also in heart and mind thither ascend, and with him continually dwell, who liveth and reigneth with thee and the Holy Ghost, one God, world without end. Amen.",
    pentecost: "God, who as at this time didst teach the hearts of thy faithful people, by the sending to them the light of thy Holy Spirit; Grant us by the same Spirit to have a right judgement in all things, and evermore to rejoice in his holy comfort; through the merits of Christ Jesus our Saviour. Amen.",
    trinity: "Almighty and everlasting God, who hast given unto us thy servants grace, by the confession of a true faith, to acknowledge the glory of the eternal Trinity, and in the power of the Divine Majesty to worship the Unity; We beseech thee, that thou wouldest keep us stedfast in this faith, and evermore defend us from all adversities, who livest and reignest, one God, world without end. Amen.",
    ordinary: [
      "O God, forasmuch as without thee we are not able to please thee; Mercifully grant, that thy Holy Spirit may in all things direct and rule our hearts; through Jesus Christ our Lord. Amen.",
      "Lord, we pray thee that thy grace may always prevent and follow us, and make us continually to be given to all good works; through Jesus Christ our Lord. Amen.",
      "O Almighty and most merciful God, of thy bountiful goodness keep us, we beseech thee, from all things that may hurt us; that we, being ready both in body and soul, may cheerfully accomplish those things that thou wouldest have done; through Jesus Christ our Lord. Amen.",
      "Grant, we beseech thee, merciful Lord, to thy faithful people pardon and peace, that they may be cleansed from all their sins, and serve thee with a quiet mind; through Jesus Christ our Lord. Amen.",
      "Stir up, we beseech thee, O Lord, the wills of thy faithful people; that they, plenteously bringing forth the fruit of good works, may of thee be plenteously rewarded; through Jesus Christ our Lord. Amen.",
      "O God, the protector of all that trust in thee, without whom nothing is strong, nothing is holy; Increase and multiply upon us thy mercy; that, thou being our ruler and guide, we may so pass through things temporal, that we finally lose not the things eternal; through Jesus Christ our Lord. Amen.",
      "Almighty and everlasting God, who art always more ready to hear than we to pray, and art wont to give more than either we desire, or deserve; Pour down upon us the abundance of thy mercy; forgiving us those things whereof our conscience is afraid, and giving us those good things which we are not worthy to ask, but through the merits and mediation of Jesus Christ, thy Son, our Lord. Amen.",
      "Keep, we beseech thee, O Lord, thy Church with thy perpetual mercy; and, because the frailty of man without thee cannot but fall, keep us ever by thy help from all things hurtful, and lead us to all things profitable to our salvation; through Jesus Christ our Lord. Amen."
    ]
  };

  function easterDate(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month - 1, day);
  }

  function addDays(d, n) {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    x.setDate(x.getDate() + n);
    return x;
  }

  function ymd(d) {
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }

  function getSeason(date) {
    const y = date.getFullYear();
    const easter = easterDate(y);
    const ash = addDays(easter, -46);
    const palm = addDays(easter, -7);
    const ascension = addDays(easter, 39);
    const pentecost = addDays(easter, 49);
    const trinity = addDays(easter, 56);
    const advent = (function () {
      const xmas = new Date(y, 11, 25);
      const dow = xmas.getDay();
      const back = dow === 0 ? 28 : 21 + dow;
      return addDays(xmas, -back);
    })();
    const n = ymd(date);
    if (n >= ymd(advent) && n < ymd(new Date(y, 11, 25))) return { id: "advent", label: "Advent" };
    if (n >= ymd(new Date(y, 11, 25)) || n < ymd(new Date(y, 0, 6))) return { id: "christmas", label: "Christmastide" };
    if (n >= ymd(new Date(y, 0, 6)) && n < ymd(ash)) return { id: "epiphany", label: "Epiphany" };
    if (n === ymd(ash)) return { id: "ash", label: "Ash Wednesday" };
    if (n > ymd(ash) && n < ymd(palm)) return { id: "lent", label: "Lent" };
    if (n >= ymd(palm) && n < ymd(easter)) return { id: "palm", label: "Holy Week" };
    if (n >= ymd(easter) && n < ymd(ascension)) return { id: "easter", label: "Eastertide" };
    if (n >= ymd(ascension) && n < ymd(pentecost)) return { id: "ascension", label: "Ascension" };
    if (n >= ymd(pentecost) && n < ymd(trinity)) return { id: "pentecost", label: "Whitsuntide" };
    if (n === ymd(trinity)) return { id: "trinity", label: "Trinity Sunday" };
    return { id: "ordinary", label: "Trinity Season" };
  }

  function collectFor(date) {
    const s = getSeason(date);
    const c = COLLECTS[s.id];
    if (Array.isArray(c)) return c[Math.floor((dayOfYear(date) / 7)) % c.length];
    return c || COLLECTS.ordinary[0];
  }

  function sentenceFor(date, office) {
    const s = getSeason(date);
    const pool = SENTENCES[s.id] || SENTENCES.ordinary;
    const extra = SENTENCES.ordinary;
    const all = pool.concat(extra);
    const i = (dayOfYear(date) + (office === "evening" ? 1 : office === "noon" ? 2 : 0)) % all.length;
    return all[i];
  }

  function dayOfYear(date) {
    const start = Date.UTC(date.getFullYear(), 0, 1);
    const now = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    return Math.floor((now - start) / 86400000);
  }

  return {
    LORDS_PRAYER, APOSTLES_CREED, VOTUM, BCP_EXHORTATION, BCP_CONFESSION,
    MIDDELBURG_CONFESSION, PARDON, COLLECT_GRACE, COLLECT_PEACE, COLLECT_PERILS,
    COLLECT_NOON, ILLUMINATION, INTERCESSIONS, THANKS, GRACE, AARON, HEIDELBERG_1,
    getSeason, collectFor, sentenceFor, dayOfYear, easterDate
  };
})();
