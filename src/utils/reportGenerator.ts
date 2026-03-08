import {
  type Planet, type ZodiacSign, type House, type Aspect,
  planets, zodiacSigns, houses, aspects,
  wisdomQuotes, parables,
} from '@/data/astrology';

export interface ReportData {
  id: string;
  type: 'combination' | 'aspect';
  title: string;
  question?: string;
  planet?: Planet;
  sign?: ZodiacSign;
  house?: House;
  planet1?: Planet;
  planet2?: Planet;
  aspect?: Aspect;
  sections: { title: string; content: string }[];
  date: string;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function generateCombinationReport(
  planet: Planet,
  sign: ZodiacSign,
  house: House,
  question?: string
): ReportData {
  const quote = pickRandom(wisdomQuotes);
  const parable = pickRandom(parables);

  const sections = [
    {
      title: '✦ 宇宙能量的序章',
      content: `在這張星盤的切面中，我們看見了${planet.name}（${planet.symbol}）落入${sign.name}（${sign.symbol}），並坐落於${house.name}的生命舞台上。這是一組獨特的宇宙編碼，揭示著靈魂在特定生命領域中，以特定風格展現其核心能量的方式。\n\n${sign.element}元素的能量在這裡與${planet.name}交織，帶來了${sign.quality}特質的節奏。讓我們一層一層地揭開這組宇宙密碼的深層意涵。`,
    },
    {
      title: `✦ ${planet.name}的宇宙能量`,
      content: `${planet.description}\n\n${planet.name}的核心能量是${planet.energy}。當這股力量在星盤中被激活，它會推動靈魂朝向與${planet.keywords.join('、')}相關的生命主題前進。\n\n在占星學的傳統中，${planet.name}被視為${planet.id === 'sun' || planet.id === 'moon' ? '發光體' : planet.id === 'mercury' || planet.id === 'venus' || planet.id === 'mars' ? '個人行星' : planet.id === 'jupiter' || planet.id === 'saturn' ? '社會行星' : '世代行星'}，它的影響力滲透在我們生命的各個層面。理解${planet.name}的能量，就像理解一位內在的嚮導——它始終在指引我們回歸真實的自我。`,
    },
    {
      title: `✦ ${sign.name}的表現風格`,
      content: `${sign.description}\n\n${sign.name}屬於${sign.element}元素，帶有${sign.quality}的特質。當能量透過${sign.name}的濾鏡展現時，會呈現出${sign.keywords.join('、')}等面向。\n\n這意味著${planet.name}的能量不是以原始的形態存在，而是經過${sign.name}的調色——如同一道光穿過不同色彩的水晶，折射出獨特的光譜。${sign.element === '火' ? '火元素帶來熱情與行動力，讓能量以直接而強烈的方式爆發。' : sign.element === '土' ? '土元素帶來實際與穩定，讓能量以踏實而具體的形式落地。' : sign.element === '風' ? '風元素帶來流動與智識，讓能量以靈活而多元的方式傳遞。' : '水元素帶來深度與感性，讓能量以直覺而感性的方式流動。'}`,
    },
    {
      title: `✦ ${house.name}的生命舞台——${house.domain}`,
      content: `${house.description}\n\n${house.name}掌管著${house.keywords.join('、')}等生命面向。當${planet.name}落入這個宮位，意味著${planet.name}所象徵的能量，將在${house.domain}這個生命領域中最為活躍。\n\n你可以想像，${house.name}是一座專屬的舞台，而${planet.name}是這座舞台上的主角。${sign.name}則決定了這位主角的表演風格——是熱情奔放，還是沉穩內斂？是充滿實驗精神，還是遵循傳統的路徑？\n\n在日常生活中，這組能量可能會在與${house.keywords[0]}相關的事務中最為明顯。你可能發現自己在這個領域中展現出特別強烈的${planet.keywords[0]}與${sign.keywords[0]}的特質。`,
    },
    {
      title: '✦ 組合解讀——宇宙的完整訊息',
      content: `將這三個占星元素整合在一起——${planet.name} × ${sign.name} × ${house.name}——我們看到的是一幅完整的靈魂畫像的局部。\n\n這組組合告訴我們：在${house.domain}的生命領域中，靈魂透過${sign.name}的${sign.keywords[0]}與${sign.keywords[1]}風格，展現${planet.name}的${planet.keywords[0]}與${planet.keywords[1]}能量。\n\n【個性特質】\n這組能量賦予人在${house.domain}領域中獨特的存在感。${planet.name}帶來核心動力，${sign.name}塑造表現方式，${house.name}指定舞台。三者結合，形成一種獨特的行為模式與內在驅力。\n\n【心理動機】\n從心理層面來看，這組配置揭示了一種深層的內在需求——在${house.domain}的領域中尋求${planet.keywords[0]}的滿足，並以${sign.name}特有的方式來達成這個目標。\n\n【人生發展方向】\n這組能量建議你在${house.domain}的領域中投入更多的關注與能量。透過理解${planet.name}在${sign.name}中的運作方式，你可以更有意識地運用這股力量，而非被動地受其驅使。\n\n【人際互動模式】\n在人際關係中，這組能量可能表現為一種以${sign.keywords[0]}為基調的互動風格，特別是在與${house.keywords[0]}相關的人際場景中。`,
    },
    {
      title: '✦ 占星哲理',
      content: `占星學教導我們，每一個行星的位置都不是偶然。${planet.name}落入${sign.name}與${house.name}，是宇宙精心編排的安排。\n\n這不是限制，而是一份地圖——指引我們理解自己的天賦、挑戰與生命方向。當我們學會閱讀這份地圖，我們便不再是命運的被動接受者，而是有意識的生命導航者。\n\n${quote}`,
    },
    {
      title: '✦ 寓言故事',
      content: `【${parable.title}】\n\n${parable.content}`,
    },
  ];

  if (question) {
    sections.push({
      title: '✦ 問題回應——宇宙的訊息',
      content: `你提出的問題是：「${question}」\n\n從${planet.name} × ${sign.name} × ${house.name}的組合來看，宇宙給予你的訊息是：\n\n在${house.domain}的領域中，你的內在${planet.name}能量正以${sign.name}的方式運作。這意味著在你所提問的議題中，關鍵在於理解${planet.keywords[0]}如何透過${sign.keywords[0]}的方式，在${house.keywords[0]}的層面發揮作用。\n\n建議你留意生活中與${house.domain}相關的線索與機會。${planet.name}的智慧正在引導你，以${sign.name}獨特的節奏，走向更清晰的生命方向。\n\n信任宇宙的安排，同時也信任自己內在的${planet.name}力量。答案往往不在遠方，而在你對自身能量的深刻理解之中。`,
    });
  }

  return {
    id: uid(),
    type: 'combination',
    title: `${planet.name} × ${sign.name} × ${house.name}`,
    question,
    planet, sign, house,
    sections,
    date: new Date().toLocaleDateString('zh-TW'),
  };
}

export function generateAspectReport(
  planet1: Planet,
  planet2: Planet,
  aspect: Aspect,
  question?: string
): ReportData {
  const quote = pickRandom(wisdomQuotes);
  const parable = pickRandom(parables);

  const sections = [
    {
      title: '✦ 宇宙能量的序章',
      content: `在這組行星相位中，我們觀察到${planet1.name}（${planet1.symbol}）與${planet2.name}（${planet2.symbol}）形成了${aspect.name}（${aspect.degree}）的關係。這是兩股宇宙力量之間的深層對話——一場關於${planet1.keywords[0]}與${planet2.keywords[0]}如何互動的宇宙劇碼。\n\n${aspect.name}的性質是${aspect.nature}的，這意味著這兩顆行星的能量以${aspect.keywords.join('、')}的方式交織在一起。讓我們深入探索這場行星之間的訊息。`,
    },
    {
      title: `✦ ${planet1.name}的能量面向`,
      content: `${planet1.description}\n\n在這組相位中，${planet1.name}代表了${planet1.energy}的核心主題。它帶著${planet1.keywords.join('、')}的能量，進入與${planet2.name}的對話。\n\n${planet1.name}的力量在這裡扮演著重要的角色——它是這場行星對話中的一個關鍵聲音，渴望表達其最本質的需求。`,
    },
    {
      title: `✦ ${planet2.name}的能量面向`,
      content: `${planet2.description}\n\n${planet2.name}帶來了${planet2.energy}的能量主題。在與${planet1.name}的互動中，${planet2.name}的${planet2.keywords.join('、')}特質會被激活並放大。\n\n這兩股力量的相遇，創造了一個能量場——在這個場域中，${planet1.name}的${planet1.keywords[0]}與${planet2.name}的${planet2.keywords[0]}必須找到共存的方式。`,
    },
    {
      title: `✦ ${aspect.name}（${aspect.degree}）——行星間的能量對話`,
      content: `${aspect.description}\n\n${aspect.name}的核心特質是${aspect.keywords.join('、')}。當${planet1.name}與${planet2.name}形成${aspect.name}時：\n\n${aspect.nature === '融合' ? `兩股能量如同混合在一起的顏料，創造出全新的色彩。${planet1.name}的${planet1.keywords[0]}與${planet2.name}的${planet2.keywords[0]}密不可分，它們會在同一個生命主題中同時展現。這種融合帶來強烈的天賦，但也可能造成能量過度集中的盲點。` : aspect.nature === '和諧' ? `能量之間存在自然的流動與支持。${planet1.name}的${planet1.keywords[0]}能夠滋養${planet2.name}的${planet2.keywords[0]}，反之亦然。這是宇宙給予的祝福，但也需要有意識地發揮，才不會被浪費。` : aspect.nature === '緊張' ? `兩股能量之間存在明顯的摩擦與張力。${planet1.name}想要${planet1.keywords[0]}，而${planet2.name}追求${planet2.keywords[0]}——兩者看似矛盾，卻正是成長的催化劑。這種張力迫使靈魂尋找創造性的解決方案。` : `兩股能量處於光譜的兩端，形成一種蹺蹺板般的動態平衡。在生活中，你可能感覺在${planet1.name}的${planet1.keywords[0]}與${planet2.name}的${planet2.keywords[0]}之間不斷擺盪，直到找到整合二者的智慧。`}`,
    },
    {
      title: '✦ 綜合解讀——靈魂的功課與禮物',
      content: `【個性特質】\n${planet1.name}${aspect.name}${planet2.name}的人，內在同時擁有${planet1.keywords[0]}與${planet2.keywords[0]}兩種驅力。這兩種力量以${aspect.nature}的方式共存，塑造了一種獨特的人格面向。\n\n【心理動機】\n在潛意識層面，這組相位揭示了一個核心主題：如何讓${planet1.name}的需求與${planet2.name}的需求和諧共存。這不是非此即彼的選擇，而是找到兩者都能被尊重的平衡點。\n\n【人生發展方向】\n${aspect.nature === '和諧' || aspect.nature === '融合' ? `這組相位為你帶來天賦的能量流動。建議你積極發揮${planet1.name}與${planet2.name}之間的協同效應，在需要結合${planet1.keywords[0]}與${planet2.keywords[0]}的領域中發光。` : `這組相位帶來的張力是你成長的動力。不要逃避${planet1.name}與${planet2.name}之間的衝突，而是學習在衝突中找到創造性的出路。`}\n\n【人際互動模式】\n在人際關係中，這組相位可能表現為：你容易吸引那些能夠反映你內在${planet1.name}與${planet2.name}能量的人。透過與他人的互動，你有機會更深入地理解自己內在的這組能量對話。`,
    },
    {
      title: '✦ 占星哲理',
      content: `行星之間的相位，是宇宙譜寫的交響曲中最動人的和弦。${planet1.name}與${planet2.name}之間的${aspect.name}，不是問題，而是一首需要被聆聽的樂章。\n\n當我們學會傾聽行星之間的對話，我們便開始理解自己內在那些看似矛盾的力量，其實都是靈魂完整表達的一部分。\n\n${quote}`,
    },
    {
      title: '✦ 寓言故事',
      content: `【${parable.title}】\n\n${parable.content}`,
    },
  ];

  if (question) {
    sections.push({
      title: '✦ 問題回應——宇宙的訊息',
      content: `你提出的問題是：「${question}」\n\n從${planet1.name}${aspect.name}${planet2.name}的角度來看，宇宙給予你的訊息是：\n\n你所詢問的議題，正好觸及了${planet1.keywords[0]}與${planet2.keywords[0]}之間的動態關係。${aspect.name}的能量告訴我們，關鍵不在於選擇其中一方，而在於理解這兩股力量如何在你的生命中共同運作。\n\n${aspect.nature === '和諧' || aspect.nature === '融合' ? `在你的處境中，${planet1.name}與${planet2.name}的和諧能量正在支持你。信任這股自然流動的力量，讓它引導你走向答案。` : `在你的處境中，${planet1.name}與${planet2.name}之間的張力可能正是推動你前進的力量。不要害怕衝突，而是在衝突中尋找突破的契機。`}\n\n記住，宇宙的智慧從來不是單一的——它是多聲部的交響曲，而你正站在指揮台上。`,
    });
  }

  return {
    id: uid(),
    type: 'aspect',
    title: `${planet1.name} ${aspect.name} ${planet2.name}`,
    question,
    planet1, planet2, aspect,
    sections,
    date: new Date().toLocaleDateString('zh-TW'),
  };
}

export function randomCombination(question?: string): ReportData {
  const planet = pickRandom(planets);
  const sign = pickRandom(zodiacSigns);
  const house = pickRandom(houses);
  return generateCombinationReport(planet, sign, house, question);
}

export function randomAspectCombination(question?: string): ReportData {
  const p1 = pickRandom(planets);
  let p2 = pickRandom(planets);
  while (p2.id === p1.id) p2 = pickRandom(planets);
  const aspect = pickRandom(aspects);
  return generateAspectReport(p1, p2, aspect, question);
}
