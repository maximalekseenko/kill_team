function _MakeWeaponMobileRow(__weapon_data) {
    return $("<tr>").addClass("showMobile").append(
        $("<td>").addClass(`w${__weapon_data["Range"]}`),

        $("<td>").html(__weapon_data["Name"])
            .attr("colspan", 5),
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

        $("<td>").html(__weapon_data["SR"])
            .addClass("ct"),
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
                (__weaponProfile_data) => [
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

    return $("<table>").addClass("table weapon-table").append(
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
                    .addClass("ct")
            )
        ),
        // Make body.
        ...__weapons_data.map(
            (_weapon_data) => _MakeWeaponRows(_weapon_data)
        )
    )
}



function MakeDatacardsDiv(__datacard_data) {

    return $("<div>").addClass('datacard').append(

        // Make header.
        $("<div>").addClass('datacard-header').append(

            // Name and fluff.
            $("<div>").addClass("datacard-header-left dark-background").append(
                $("<h3>").addClass("name-text")
                    .html(__datacard_data.Name),
                $("<p>").addClass("desc-text")
                    .html(__datacard_data.Fluff)
            ),

            // Stats.
            $("<div>").addClass("datacard-header-right").append(
                $("<table>").addClass("datacard-stats-table").append(
                    $("<tr>").append(
                        $("<td>").html("M"),
                        $("<td>").html("APL"),
                        $("<td>").html("GA"),
                    ),
                    $("<tr>").append(
                        $("<td>").html(__datacard_data.Stats.M),
                        $("<td>").html(__datacard_data.Stats.APL),
                        $("<td>").html(__datacard_data.Stats.GA),
                    ),
                ),
                $("<table>").addClass("datacard-stats-table").append(
                    $("<tr>").append(
                        $("<td>").html("DF"),
                        $("<td>").html("SV"),
                        $("<td>").html("W"),
                    ),
                    $("<tr>").append(
                        $("<td>").html(__datacard_data.Stats.DF),
                        $("<td>").html(__datacard_data.Stats.SV),
                        $("<td>").html(__datacard_data.Stats.W),
                    ),
                )
            )
        ),

        // Make tables.
        $("<div>").addClass('datacard-tables').append(
            $("<div>").addClass('datacard-tables-top').append(

                // Weapons.
                MakeWeaponsTable(__datacard_data.Weapons)
            ),

            $("<div>").addClass('datacard-tables-bottom').append(

                // Abilities.
                __datacard_data.Abilities.length > 0 ?
                    $("<table>").addClass("table").append(
                        $("<tbody>").append(
                            $("<tr>").append(
                                $("<td>").html("Abilities")
                            )
                        ),
                        ...__datacard_data.Abilities.map(
                            (_ability_data) => $("<tbody>").append(
                                $("<tr>").append(
                                    $("<td>").append(
                                        $("<p>").append(
                                            $("<b>").html(_ability_data.Name), " ",
                                            _ability_data.Desc
                                        ),
                                    ),
                                )
                            )
                        )
                    ) : undefined,

                // Unique actions.
                __datacard_data.Unique_Actions.length > 0 ?
                    $("<table>").addClass("table").append(
                        $("<tbody>").append(
                            $("<tr>").append(
                                $("<td>").html("Unique actions")
                            )
                        ),
                        ...__datacard_data.Unique_Actions.map(
                            (_ability_data) => $("<tbody>").append(
                                $("<tr>").append(
                                    $("<td>").append(
                                        $("<p>").append(
                                            $("<b>").html(_ability_data.Name), " ",
                                            _ability_data.Desc
                                        ),
                                    ),
                                )
                            )
                        ),
                        $("<tbody>")
                    ) : undefined,

            )
        )
    );
}



$.getJSON(KILLTEAM_DATA_URL, (kt_data) => {

    var _datacards = $("#datacards")
    kt_data.Datacards.forEach(_datacard_data => {
        _datacards.append(MakeDatacardsDiv(_datacard_data));
    });
})