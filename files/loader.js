function _MakeContentText(__content_text) {
    return $("<p>").html(__content_text)
}

function _MakeContentList(__content_list) {
    return $("<ul>").append(
        __content_list.map(_content_list_el =>
            $("<li>").append(
                $("<p>").html(_content_list_el["Text"]),
                _content_list_el["Options"] ? _MakeContentList(_content_list_el["Options"])
                    : undefined
            )
        )
    )
}

function _MakeContentWeapon(__content_el) {

}

function MakeContent(__content) {
    return $("<div>")
        .addClass("content")
        .append(
            __content.map(_content_el => {

                // Determine content type
                // > Text
                if (typeof (_content_el) === "string")
                    return _MakeContentText(_content_el)

                // > List
                if (Array.isArray(_content_el))
                    return _MakeContentList(_content_el)
            })
        )
}



function _MakeWeaponMobileRow(__weapon_data) {
    return $("<tr>").addClass("showMobile").append(
        $("<td>").addClass(`w${__weapon_data["Range"]}`),

        $("<td>").html(__weapon_data["Name"])
            .attr("colspan", 6),
    );
}


function _MakeWeaponRulesList(__rules) {
    return __rules.flatMap(
        (_rule_text, _index) => _index == 0 ? _rule_text : [", ", _rule_text]
    );
}


function _MakeWeaponStatsRow(__weapon_data) {
    return $("<tr>").append(
        $("<td>").addClass("showMobile"),

        $("<td>").addClass(`w${__weapon_data["Range"]}`)
            .addClass("ct")
            .addClass("hideMobile"),

        $("<td>").html(__weapon_data["Name"])
            .addClass("hideMobile"),

        $("<td>").html(__weapon_data["A"])
            .addClass("ct"),

        $("<td>").html(__weapon_data["BS_WS"])
            .addClass("ct"),

        $("<td>").html(__weapon_data["D"])
            .addClass("ct"),

        $("<td>")
            .addClass("showMobile")
            .addClass("ct")
            .append(
                // If nothing
                !(__weapon_data["SR"].length || __weapon_data["Crit"].length) ? "-" : undefined,

                // Special rules
                __weapon_data["SR"].length ? (
                    $("<span>").append(_MakeWeaponRulesList(__weapon_data["SR"]))
                ) : undefined,

                // Special rules and Critical Rules
                (__weapon_data["SR"].length && __weapon_data["Crit"].length) ? ". " : undefined,

                // Critical Rules
                __weapon_data["Crit"].length ? (
                    $("<b>")
                        .html("!")
                        .append(
                            _MakeWeaponRulesList(__weapon_data["Crit"])
                        )
                ) : undefined,
            ),
        $("<td>")
            .addClass("hideMobile")
            .addClass("ct")
            .append(
                // If nothing
                !__weapon_data["SR"].length ? "-" : undefined,

                // Special rules
                __weapon_data["SR"].length ? (
                    $("<span>").append(_MakeWeaponRulesList(__weapon_data["SR"]))
                ) : undefined,

            ),
        $("<td>")
            .addClass("hideMobile")
            .addClass("ct")
            .append(
                // If nothing
                !__weapon_data["Crit"].length ? "-" : undefined,

                // Critical Rules
                __weapon_data["Crit"].length ? (
                    $("<span>")
                        .append(_MakeWeaponRulesList(__weapon_data["Crit"]))
                ) : undefined,
            )
    );
}



function _MakeWeaponRows(__weapon_data) {

    // Make multi-option header and body.
    if (__weapon_data["Multi-options"]) {
        return $("<tbody>").append(

            // Make mobile header.
            _MakeWeaponMobileRow(__weapon_data),

            // Make mobile desc.
            $("<tr>")
                .addClass("showMobile")
                .append(
                    $("<td>").html(__weapon_data["Multi-desc"])
                        .addClass("desc-text")
                        .attr("colspan", 6)
                ),

            // Make non-mobile Row
            $("<tr>")
                .addClass("hideMobile")
                .append(
                    $("<td>").addClass(`w${__weapon_data["Range"]}`)
                        .addClass("ct")
                        .addClass("hideMobile"),

                    $("<td>").html(__weapon_data["Name"])
                        .addClass("hideMobile"),

                    $("<td>").html(__weapon_data["Multi-desc"])
                        .addClass("desc-text")
                        .attr("colspan", 6)
                ),

            // Make weapon profiles
            ...__weapon_data["Multi-options"].map(
                __weaponProfile_data => [
                    _MakeWeaponMobileRow(__weaponProfile_data),
                    _MakeWeaponStatsRow(__weaponProfile_data)
                ]
            )
        );
        // Make multi-option body.

    }

    // Normal weapon.
    else return $("<tbody>").append(
        _MakeWeaponMobileRow(__weapon_data),
        _MakeWeaponStatsRow(__weapon_data)
    );
}



function MakeWeaponsTable(__weapons_data) {

    return $("<table>").addClass("table weapons-table").append(
        // Make head.
        $("<tbody>").append(
            $("<tr>").append(
                $("<td>")
                    .css("width", "24px")
                    .addClass("ct"),

                $("<td>").html("Name")
                    .css("width", "180px")
                    .addClass("hideMobile"),

                $("<td>").html("A")
                    .addClass("ct")
                    .css("width", "42px"),

                $("<td>").html("BS/WS")
                    .addClass("ct")
                    .css("width", "42px"),

                $("<td>").html("D")
                    .addClass("ct")
                    .css("width", "42px"),

                $("<td>").html("SR")
                    .addClass("showMobile")
                    .addClass("ct"),

                $("<td>").html("Special Rules")
                    .addClass("hideMobile")
                    .addClass("ct"),

                $("<td>").html("!")
                    .addClass("hideMobile")
                    .addClass("ct")
            )
        ),
        // Make body.
        ...__weapons_data.map(
            _weapon_data => _MakeWeaponRows(_weapon_data)
        )
    )
}


function MakeAbilitiesTable(__typeOfAbilities, __abilities_data) {
    return $("<table>")
        .addClass("abilities-table")
        .addClass("table")
        .append(
            $("<tbody>").append(
                $("<tr>").append(
                    $("<td>").html(__typeOfAbilities)
                )
            ),
            __abilities_data.map(
                _ability_data => $("<tbody>").append(
                    $("<tr>").append(
                        $("<td>").append(
                            $("<p>").append(
                                $("<b>").html(_ability_data.Name), ": ", _ability_data.Content
                            ),
                        ),
                    )
                )
            )
        );
}



function MakeDatacardsDiv(__datacard_data) {

    return $("<div>")
        .addClass('datacard')
        .append(

            // Make header.
            $("<div>")
                .addClass('datacard-header')
                .addClass('columnMobile')
                .append(

                    // Name and fluff.
                    $("<div>")
                        .addClass("datacard-header-left")
                        .append(
                            $("<h3>")
                                .addClass("operative-text")
                                .html(__datacard_data.Name),
                            $("<p>")
                                .addClass("desc-text")
                                .html(__datacard_data.Fluff)
                        ),

                    // Stats.
                    $("<div>")
                        .addClass("datacard-header-right")
                        .append(
                            $("<table>")
                                .addClass("table")
                                .addClass("stats-table")
                                .append(
                                    $("<tbody>")
                                        .addClass("showMobile")
                                        .append(
                                            $("<tr>").append(
                                                $("<td>").html("M"),
                                                $("<td>").html("APL"),
                                                $("<td>").html("GA"),
                                                $("<td>").html("DF"),
                                                $("<td>").html("SV"),
                                                $("<td>").html("W"),
                                            ),
                                        ),
                                    $("<tbody>")
                                        .addClass("showMobile")
                                        .append(
                                            $("<tr>").append(
                                                $("<td>").html(__datacard_data.Stats.M),
                                                $("<td>").html(__datacard_data.Stats.APL),
                                                $("<td>").html(__datacard_data.Stats.GA),
                                                $("<td>").html(__datacard_data.Stats.DF),
                                                $("<td>").html(__datacard_data.Stats.SV),
                                                $("<td>").html(__datacard_data.Stats.W),
                                            )
                                        ),
                                    $("<tbody>")
                                        .addClass("hideMobile")
                                        .append(
                                            $("<tr>").append(
                                                $("<td>").html("M"),
                                                $("<td>").html("APL"),
                                                $("<td>").html("GA"),
                                            ),
                                        ),
                                    $("<tbody>")
                                        .addClass("hideMobile")
                                        .append(
                                            $("<tr>").append(
                                                $("<td>").html(__datacard_data.Stats.M),
                                                $("<td>").html(__datacard_data.Stats.APL),
                                                $("<td>").html(__datacard_data.Stats.GA),
                                            )
                                        ),
                                    $("<tbody>")
                                        .addClass("hideMobile")
                                        .append(
                                            $("<tr>").append(
                                                $("<td>").html("DF"),
                                                $("<td>").html("SV"),
                                                $("<td>").html("W"),
                                            ),
                                        ),
                                    $("<tbody>")
                                        .addClass("hideMobile")
                                        .append(
                                            $("<tr>").append(
                                                $("<td>").html(__datacard_data.Stats.DF),
                                                $("<td>").html(__datacard_data.Stats.SV),
                                                $("<td>").html(__datacard_data.Stats.W),
                                            )
                                        ),
                                )
                        )
                ),

            // Make Weapons tables.
            MakeWeaponsTable(__datacard_data.Weapons),

            // Make other tables.
            $("<div>")
                .addClass('datacard-abilities-tables')
                .addClass('columnMobile')
                .append(

                    // Abilities.
                    __datacard_data["Abilities"].length > 0 ?
                        MakeAbilitiesTable("Abilities", __datacard_data["Abilities"])
                        : undefined,

                    // Unique actions.
                    __datacard_data["Unique_Actions"].length > 0 ?
                        MakeAbilitiesTable("Unique actions", __datacard_data["Unique_Actions"])
                        : undefined,
                )
        );
}



function MakeOperativesListObject(__operatives_list_object) {
    return $("<li>").append(
        $("<p>").html(__operatives_list_object["Content"]),
        __operatives_list_object["Options"] != undefined ?
            $("<ul>").append(
                __operatives_list_object["Options"].map(__operative_object => MakeOperativesListObject(__operative_object))
            ) : undefined
    )
}


$(() => {
    $.getJSON(KILLTEAM_DATA_URL, (kt_data) => {

        $("#killteam").append(
            $("<p>")
                .addClass("archetype")
                .html("Archetype: " + kt_data["Archetype"].join(" / ")),

            $("<h1>")
                .html(kt_data["Name"] + " Kill Team"),

            $("<p>")
                .html(`Below you will find a list of the operatives that make up an <span class="killteam-text">${kt_data["Name"]}</span> kill team, including, where relevant, any wargear those operatives must be equipped with.`),

            $("<div>")
                .addClass("killteam-container")
                .addClass("columnMobile")
                .append(

                    // Operatives.
                    $("<div>").append(
                        $("<h2>").html("Operatives"),
                        MakeContent(kt_data["Operatives"])
                    ),

                    // Ability.
                    kt_data["Ability"].length ? $("<div>").append(
                        $("<h2>").html("Ability"),

                        $("<p>").html(`Below, you will find common abilities of the <span class="killteam-text">${kt_data[""]}</span> team.`),

                        kt_data["Ability"].map(
                            _ability_data => $("<span>").append(
                                $("<h3>").html(_ability_data["Name"]),
                                MakeContent(_ability_data["Content"])
                            )
                        ),

                    )
                        : undefined
                )
        );

        $("#tac_ops");

        $("#ploys")
            .addClass("columnMobile")
            .append(
                $("<div>").append(
                    $("<h2>").html("Strategic Ploys"),

                    $("<p>").html(`If your faction is <span class='killteam-text'>${kt_data["Name"]}</span>, you can use the following Strategic Ploys during a game.`),

                    kt_data["Strategic_Ploys"].map(_ploy =>
                        $("<div>")
                            .addClass("card")
                            .append(
                                $("<div>")
                                    .addClass("strategic_ploy-header")
                                    .append(
                                        $("<h3>").html(_ploy["Name"]),
                                        $("<p>").append(
                                            $("<span>").append(_ploy["Cost"]),
                                            "CP",
                                        )
                                    ),

                                MakeContent(_ploy["Content"])
                            )
                    )
                ),

                $("<div>").append(
                    $("<h2>").html("Tactical Ploys"),

                    $("<p>").html(`If your faction is <span class='killteam-text'>${kt_data["Name"]}</span>, you can use the following Tactical Ploys during a game.`),

                    kt_data["Tactical_Ploys"].map(_ploy =>
                        $("<div>")
                            .addClass("card")
                            .append(
                                $("<div>")
                                    .addClass("tactical_ploy-header")
                                    .append(
                                        $("<h3>").html(_ploy["Name"]),
                                        $("<p>").append(
                                            $("<span>").append(_ploy["Cost"]),
                                            "CP",
                                        )
                                    ),

                                MakeContent(_ploy["Content"])
                            )
                    )
                )
            );

        // datacards
        $("#datacards").append(
            kt_data.Datacards.map(_datacard_data => MakeDatacardsDiv(_datacard_data))
        );
    })
})