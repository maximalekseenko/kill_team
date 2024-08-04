function MakeDatacardsDiv(__datacard_data) {

    return $("<div>").addClass('datacard').append(

        // Make header.
        $("<div>").addClass('datacard-header').append(

            // Name and fluff.
            $("<div>").addClass("datacard-header-left dark-background").append(
                $("<h3>").addClass("name-text")
                    .html(__datacard_data.Name),
                $("<p>").addClass("fluff-text")
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
                $("<table>").addClass("table weapon-table").append(
                    $("<tbody>").append(
                        $("<tr>").append(
                            $("<td>"),
                            $("<td>").html("Name"),
                            $("<td>").html("A"),
                            $("<td>").html("BS/WS"),
                            $("<td>").html("D"),
                            $("<td>").html("SR"),
                            $("<td>").html("!"),
                        )
                    ),
                    ...__datacard_data.Weapons.map(
                        (_weapon_data) => $("<tbody>").append(
                            _weapon_data["Multy-options"] ? [
                                $("<tr>").append(
                                    $("<td>").html(`<img class="w${_weapon_data.Range}">`),
                                    $("<td>").html(_weapon_data.Name),
                                    $("<td>")
                                        .css("text-align", "left")
                                        .css("font-style", "italic")
                                        .attr("colspan", "5")
                                        .html(_weapon_data["Multy-text"]),
                                ),
                                ..._weapon_data["Multy-options"].map(
                                    (_weapon_profile_data) => $("<tr>").append(
                                        $("<td>"),
                                        $("<td>").html('- ' + _weapon_profile_data.Name),
                                        $("<td>").html(_weapon_profile_data.A),
                                        $("<td>").html(_weapon_profile_data.BS_WS),
                                        $("<td>").html(_weapon_profile_data.D),
                                        $("<td>").html(_weapon_profile_data.SR),
                                        $("<td>").html(_weapon_profile_data.Crit)
                                    )
                                )
                            ] :
                                $("<tr>").append(
                                    $("<td>").html(`<img class="w${_weapon_data.Range}">`),
                                    $("<td>").html(_weapon_data.Name),
                                    $("<td>").html(_weapon_data.A),
                                    $("<td>").html(_weapon_data.BS_WS),
                                    $("<td>").html(_weapon_data.D),
                                    $("<td>").html(_weapon_data.SR),
                                    $("<td>").html(_weapon_data.Crit)
                                )
                        )
                    )
                )
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