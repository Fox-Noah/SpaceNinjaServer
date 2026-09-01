(function () {
    "use strict";

    const language = localStorage.getItem("lang") ?? window.webui_conf?.defaultLanguage ?? "en";
    if (!language.toLowerCase().startsWith("zh")) return;

    const statNames = {
        ComboDurationMod: "连击持续时间",
        SlideAttackCritChanceMod: "滑行攻击暴击几率",
        WeaponAmmoMaxMod: "弹药最大值",
        WeaponArmorPiercingDamageMod: "穿刺伤害",
        WeaponClipMaxMod: "弹匣容量",
        WeaponCritChanceMod: "暴击几率",
        WeaponCritDamageMod: "暴击伤害",
        WeaponDamageAmountMod: "伤害",
        WeaponElectricityDamageMod: "电击伤害",
        WeaponFactionDamageCorpus: "对 Corpus 的伤害",
        WeaponFactionDamageGrineer: "对 Grineer 的伤害",
        WeaponFactionDamageInfested: "对 Infested 的伤害",
        WeaponFireDamageMod: "火焰伤害",
        WeaponFireIterationsMod: "多重射击",
        WeaponFireRateMod: "射速／攻击速度",
        WeaponFreezeDamageMod: "冰冻伤害",
        WeaponImpactDamageMod: "冲击伤害",
        WeaponMeleeComboBonusOnHitMod: "额外连击数几率",
        WeaponMeleeComboEfficiencyMod: "重击效率",
        WeaponMeleeComboInitialBonusMod: "初始连击",
        WeaponMeleeComboPointsOnHitMod: "命中获得的连击数",
        WeaponMeleeDamageMod: "近战伤害",
        WeaponMeleeFactionDamageCorpus: "对 Corpus 的近战伤害",
        WeaponMeleeFactionDamageGrineer: "对 Grineer 的近战伤害",
        WeaponMeleeFactionDamageInfested: "对 Infested 的近战伤害",
        WeaponMeleeFinisherDamageMod: "处决伤害",
        WeaponMeleeRangeIncMod: "攻击范围",
        WeaponProcTimeMod: "触发时间",
        WeaponProjectileSpeedMod: "投射物速度",
        WeaponPunctureDepthMod: "穿透",
        WeaponRecoilReductionMod: "武器后坐力",
        WeaponReloadSpeedMod: "装填速度",
        WeaponSlashDamageMod: "切割伤害",
        WeaponStunChanceMod: "触发几率",
        WeaponToxinDamageMod: "毒素伤害",
        WeaponZoomFovMod: "变焦"
    };

    const typeNames = {
        LotusArchgunRandomModRare: "曲翼枪械裂罅 Mod",
        LotusModularMeleeRandomModRare: "Zaw 裂罅 Mod",
        LotusModularPistolRandomModRare: "组合枪裂罅 Mod",
        LotusPistolRandomModRare: "手枪裂罅 Mod",
        LotusRifleRandomModRare: "步枪裂罅 Mod",
        LotusShotgunRandomModRare: "霰弹枪裂罅 Mod",
        PlayerMeleeWeaponRandomModRare: "近战裂罅 Mod"
    };

    const polarityNames = {
        AP_UNIVERSAL: "无极性",
        AP_ANY: "通用极性",
        AP_DEFENSE: "Vazarin",
        AP_TACTIC: "Naramon",
        AP_ATTACK: "Madurai",
        AP_POWER: "Zenurik",
        AP_WARD: "Unairu",
        AP_PRECEPT: "Penjaga",
        AP_UMBRA: "Umbra"
    };

    function setText(selector, text) {
        const element = document.querySelector(selector);
        if (element) element.textContent = text;
    }

    function translateStatOptions() {
        document.querySelectorAll("#buffs select option, #curses select option").forEach(option => {
            const translatedName = statNames[option.value];
            if (translatedName && option.textContent !== translatedName) {
                option.textContent = translatedName;
            }
        });
        document.querySelectorAll(".left-value").forEach(input => input.title = "紫卡内部数值（9000–11000）");
        document.querySelectorAll(".right-value").forEach(input => input.title = "游戏内显示数值");
        document.querySelectorAll(".grade").forEach(element => element.title = "属性评级");
    }

    document.documentElement.lang = "zh-CN";
    document.title = "Warframe 紫卡工具";

    const headers = document.querySelectorAll(".card-header");
    ["正面属性", "负面属性", "其他设置", "指纹数据"].forEach((text, index) => {
        if (headers[index]) headers[index].textContent = text;
    });

    const suffixParagraph = document.querySelector("#name-suffix")?.parentElement;
    if (suffixParagraph) {
        suffixParagraph.firstChild.textContent = "正面属性生成的名称后缀：";
    }

    setText('label[for="compat"]', "适用武器");
    setText('label[for="lvl"]', "等级");
    setText('label[for="polarity"]', "极性");
    setText('label[for="lvlReq"]', "最低段位");
    setText('label[for="rerolls"]', "重洗次数");

    document.querySelectorAll("#riven-type option").forEach(option => {
        if (typeNames[option.value]) option.textContent = typeNames[option.value];
    });
    document.getElementById("riven-type").title = "紫卡类型";
    document.getElementById("omega-attenuation").title = "紫卡倾向性";

    document.querySelectorAll("#polarity option").forEach(option => {
        if (polarityNames[option.value]) option.textContent = polarityNames[option.value];
    });

    translateStatOptions();
    const observer = new MutationObserver(translateStatOptions);
    observer.observe(document.getElementById("buffs"), { childList: true, subtree: true });
    observer.observe(document.getElementById("curses"), { childList: true, subtree: true });
})();
