import type { Route } from "@/lib/schemas";
import type { CourseId } from "./courses";

interface TypedRoute extends Omit<Route, "fromCourseId" | "toCourseId"> {
  fromCourseId: CourseId;
  toCourseId: CourseId;
  imageUrl?: string;
  memo?: string;
}

export const routes = [
  {
    id: "Whistlestop_Summit-to-DK_Spaceport",
    fromCourseId: "Whistlestop_Summit",
    toCourseId: "DK_Spaceport",
  },
  {
    id: "Crown_City-to-DK_Spaceport",
    fromCourseId: "Crown_City",
    toCourseId: "DK_Spaceport",
  },
  {
    id: "Koopa_Troopa_Beach-to-DK_Spaceport",
    fromCourseId: "Koopa_Troopa_Beach",
    toCourseId: "DK_Spaceport",
  },
  {
    id: "Sky-High_Sundae-to-DK_Pass",
    fromCourseId: "Sky-High_Sundae",
    toCourseId: "DK_Pass",
  },
  {
    id: "Dandelion_Depths-to-DK_Pass",
    fromCourseId: "Dandelion_Depths",
    toCourseId: "DK_Pass",
  },
  {
    id: "Salty_Salty_Speedway-to-DK_Pass",
    fromCourseId: "Salty_Salty_Speedway",
    toCourseId: "DK_Pass",
  },
  {
    id: "Cheep_Cheep_Falls-to-DK_Pass",
    fromCourseId: "Cheep_Cheep_Falls",
    toCourseId: "DK_Pass",
  },
  {
    id: "Moo_Moo_Meadows-to-DK_Pass",
    fromCourseId: "Moo_Moo_Meadows",
    toCourseId: "DK_Pass",
  },
  {
    id: "Starview_Peak-to-DK_Pass",
    fromCourseId: "Starview_Peak",
    toCourseId: "DK_Pass",
  },
  {
    id: "Wario_Shipyard-to-DK_Pass",
    fromCourseId: "Wario_Shipyard",
    toCourseId: "DK_Pass",
  },
  {
    id: "DK_Pass-to-Sky-High_Sundae",
    fromCourseId: "DK_Pass",
    toCourseId: "Sky-High_Sundae",
  },
  {
    id: "Dandelion_Depths-to-Sky-High_Sundae",
    fromCourseId: "Dandelion_Depths",
    toCourseId: "Sky-High_Sundae",
  },
  {
    id: "Starview_Peak-to-Sky-High_Sundae",
    fromCourseId: "Starview_Peak",
    toCourseId: "Sky-High_Sundae",
  },
  {
    id: "Wario_Shipyard-to-Sky-High_Sundae",
    fromCourseId: "Wario_Shipyard",
    toCourseId: "Sky-High_Sundae",
  },
  {
    id: "Dandelion_Depths-to-Boo_Cinema",
    fromCourseId: "Dandelion_Depths",
    toCourseId: "Boo_Cinema",
  },
  {
    id: "Acorn_Heights-to-Boo_Cinema",
    fromCourseId: "Acorn_Heights",
    toCourseId: "Boo_Cinema",
  },
  {
    id: "Dry_Bones_Burnout-to-Boo_Cinema",
    fromCourseId: "Dry_Bones_Burnout",
    toCourseId: "Boo_Cinema",
  },
  {
    id: "Mario_Circuit-to-Boo_Cinema",
    fromCourseId: "Mario_Circuit",
    toCourseId: "Boo_Cinema",
  },
  {
    id: "Starview_Peak-to-Boo_Cinema",
    fromCourseId: "Starview_Peak",
    toCourseId: "Boo_Cinema",
  },
  {
    id: "Airship_Fortress-to-Toad's_Factory",
    fromCourseId: "Airship_Fortress",
    toCourseId: "Toad's_Factory",
  },
  {
    id: "Bowser's_Castle-to-Toad's_Factory",
    fromCourseId: "Bowser's_Castle",
    toCourseId: "Toad's_Factory",
  },
  {
    id: "Dandelion_Depths-to-Toad's_Factory",
    fromCourseId: "Dandelion_Depths",
    toCourseId: "Toad's_Factory",
  },
  {
    id: "Choco_Mountain-to-Toad's_Factory",
    fromCourseId: "Choco_Mountain",
    toCourseId: "Toad's_Factory",
  },
  {
    id: "Acorn_Heights-to-Toad's_Factory",
    fromCourseId: "Acorn_Heights",
    toCourseId: "Toad's_Factory",
  },
  {
    id: "Peach_Stadium-to-Toad's_Factory",
    fromCourseId: "Peach_Stadium",
    toCourseId: "Toad's_Factory",
  },
  {
    id: "Dry_Bones_Burnout-to-Toad's_Factory",
    fromCourseId: "Dry_Bones_Burnout",
    toCourseId: "Toad's_Factory",
  },
  {
    id: "Mario_Circuit-to-Toad's_Factory",
    fromCourseId: "Mario_Circuit",
    toCourseId: "Toad's_Factory",
  },
  {
    id: "Mario_Bros._Circuit-to-Toad's_Factory",
    fromCourseId: "Mario_Bros._Circuit",
    toCourseId: "Toad's_Factory",
  },
  {
    id: "Moo_Moo_Meadows-to-Toad's_Factory",
    fromCourseId: "Moo_Moo_Meadows",
    toCourseId: "Toad's_Factory",
  },
  {
    id: "Wario_Stadium-to-Toad's_Factory",
    fromCourseId: "Wario_Stadium",
    toCourseId: "Toad's_Factory",
  },
  {
    id: "Toad's_Factory-to-Airship_Fortress",
    fromCourseId: "Toad's_Factory",
    toCourseId: "Airship_Fortress",
  },
  {
    id: "Bowser's_Castle-to-Airship_Fortress",
    fromCourseId: "Bowser's_Castle",
    toCourseId: "Airship_Fortress",
  },
  {
    id: "Shy_Guy_Bazaar-to-Airship_Fortress",
    fromCourseId: "Shy_Guy_Bazaar",
    toCourseId: "Airship_Fortress",
  },
  {
    id: "Dry_Bones_Burnout-to-Airship_Fortress",
    fromCourseId: "Dry_Bones_Burnout",
    toCourseId: "Airship_Fortress",
  },
  {
    id: "Wario_Stadium-to-Airship_Fortress",
    fromCourseId: "Wario_Stadium",
    toCourseId: "Airship_Fortress",
  },
  {
    id: "Toad's_Factory-to-Bowser's_Castle",
    fromCourseId: "Toad's_Factory",
    toCourseId: "Bowser's_Castle",
  },
  {
    id: "Airship_Fortress-to-Bowser's_Castle",
    fromCourseId: "Airship_Fortress",
    toCourseId: "Bowser's_Castle",
  },
  {
    id: "Choco_Mountain-to-Bowser's_Castle",
    fromCourseId: "Choco_Mountain",
    toCourseId: "Bowser's_Castle",
  },
  {
    id: "Dry_Bones_Burnout-to-Bowser's_Castle",
    fromCourseId: "Dry_Bones_Burnout",
    toCourseId: "Bowser's_Castle",
  },
  {
    id: "Mario_Circuit-to-Bowser's_Castle",
    fromCourseId: "Mario_Circuit",
    toCourseId: "Bowser's_Castle",
  },
  {
    id: "Wario_Stadium-to-Bowser's_Castle",
    fromCourseId: "Wario_Stadium",
    toCourseId: "Bowser's_Castle",
  },
  {
    id: "DK_Spaceport-to-Desert_Hills",
    fromCourseId: "DK_Spaceport",
    toCourseId: "Desert_Hills",
  },
  {
    id: "Whistlestop_Summit-to-Desert_Hills",
    fromCourseId: "Whistlestop_Summit",
    toCourseId: "Desert_Hills",
  },
  {
    id: "Crown_City-to-Desert_Hills",
    fromCourseId: "Crown_City",
    toCourseId: "Desert_Hills",
  },
  {
    id: "Shy_Guy_Bazaar-to-Desert_Hills",
    fromCourseId: "Shy_Guy_Bazaar",
    toCourseId: "Desert_Hills",
  },
  {
    id: "Mario_Bros._Circuit-to-Desert_Hills",
    fromCourseId: "Mario_Bros._Circuit",
    toCourseId: "Desert_Hills",
  },
  {
    id: "DK_Spaceport-to-Whistlestop_Summit",
    fromCourseId: "DK_Spaceport",
    toCourseId: "Whistlestop_Summit",
  },
  {
    id: "Desert_Hills-to-Whistlestop_Summit",
    fromCourseId: "Desert_Hills",
    toCourseId: "Whistlestop_Summit",
  },
  {
    id: "Choco_Mountain-to-Whistlestop_Summit",
    fromCourseId: "Choco_Mountain",
    toCourseId: "Whistlestop_Summit",
  },
  {
    id: "Crown_City-to-Whistlestop_Summit",
    fromCourseId: "Crown_City",
    toCourseId: "Whistlestop_Summit",
  },
  {
    id: "Mario_Bros._Circuit-to-Whistlestop_Summit",
    fromCourseId: "Mario_Bros._Circuit",
    toCourseId: "Whistlestop_Summit",
  },
  {
    id: "DK_Pass-to-Dandelion_Depths",
    fromCourseId: "DK_Pass",
    toCourseId: "Dandelion_Depths",
  },
  {
    id: "Sky-High_Sundae-to-Dandelion_Depths",
    fromCourseId: "Sky-High_Sundae",
    toCourseId: "Dandelion_Depths",
  },
  {
    id: "Boo_Cinema-to-Dandelion_Depths",
    fromCourseId: "Boo_Cinema",
    toCourseId: "Dandelion_Depths",
  },
  {
    id: "Toad's_Factory-to-Dandelion_Depths",
    fromCourseId: "Toad's_Factory",
    toCourseId: "Dandelion_Depths",
  },
  {
    id: "Acorn_Heights-to-Dandelion_Depths",
    fromCourseId: "Acorn_Heights",
    toCourseId: "Dandelion_Depths",
  },
  {
    id: "Cheep_Cheep_Falls-to-Dandelion_Depths",
    fromCourseId: "Cheep_Cheep_Falls",
    toCourseId: "Dandelion_Depths",
  },
  {
    id: "Mario_Circuit-to-Dandelion_Depths",
    fromCourseId: "Mario_Circuit",
    toCourseId: "Dandelion_Depths",
  },
  {
    id: "Moo_Moo_Meadows-to-Dandelion_Depths",
    fromCourseId: "Moo_Moo_Meadows",
    toCourseId: "Dandelion_Depths",
  },
  {
    id: "Starview_Peak-to-Dandelion_Depths",
    fromCourseId: "Starview_Peak",
    toCourseId: "Dandelion_Depths",
  },
  {
    id: "DK_Pass-to-Salty_Salty_Speedway",
    fromCourseId: "DK_Pass",
    toCourseId: "Salty_Salty_Speedway",
  },
  {
    id: "Sky-High_Sundae-to-Salty_Salty_Speedway",
    fromCourseId: "Sky-High_Sundae",
    toCourseId: "Salty_Salty_Speedway",
  },
  {
    id: "Dino_Dino_Jungle-to-Salty_Salty_Speedway",
    fromCourseId: "Dino_Dino_Jungle",
    toCourseId: "Salty_Salty_Speedway",
  },
  {
    id: "Great_?_Block_Ruins-to-Salty_Salty_Speedway",
    fromCourseId: "Great_?_Block_Ruins",
    toCourseId: "Salty_Salty_Speedway",
  },
  {
    id: "Peach_Beach-to-Salty_Salty_Speedway",
    fromCourseId: "Peach_Beach",
    toCourseId: "Salty_Salty_Speedway",
  },
  {
    id: "Cheep_Cheep_Falls-to-Salty_Salty_Speedway",
    fromCourseId: "Cheep_Cheep_Falls",
    toCourseId: "Salty_Salty_Speedway",
  },
  {
    id: "Faraway_Oasis-to-Salty_Salty_Speedway",
    fromCourseId: "Faraway_Oasis",
    toCourseId: "Salty_Salty_Speedway",
  },
  {
    id: "Wario_Shipyard-to-Salty_Salty_Speedway",
    fromCourseId: "Wario_Shipyard",
    toCourseId: "Salty_Salty_Speedway",
  },
  {
    id: "Toad's_Factory-to-Choco_Mountain",
    fromCourseId: "Toad's_Factory",
    toCourseId: "Choco_Mountain",
  },
  {
    id: "Bowser's_Castle-to-Choco_Mountain",
    fromCourseId: "Bowser's_Castle",
    toCourseId: "Choco_Mountain",
  },
  {
    id: "Whistlestop_Summit-to-Choco_Mountain",
    fromCourseId: "Whistlestop_Summit",
    toCourseId: "Choco_Mountain",
  },
  {
    id: "Crown_City-to-Choco_Mountain",
    fromCourseId: "Crown_City",
    toCourseId: "Choco_Mountain",
  },
  {
    id: "Peach_Stadium-to-Choco_Mountain",
    fromCourseId: "Peach_Stadium",
    toCourseId: "Choco_Mountain",
  },
  {
    id: "Cheep_Cheep_Falls-to-Choco_Mountain",
    fromCourseId: "Cheep_Cheep_Falls",
    toCourseId: "Choco_Mountain",
  },
  {
    id: "Shy_Guy_Bazaar-to-Choco_Mountain",
    fromCourseId: "Shy_Guy_Bazaar",
    toCourseId: "Choco_Mountain",
  },
  {
    id: "Mario_Bros._Circuit-to-Choco_Mountain",
    fromCourseId: "Mario_Bros._Circuit",
    toCourseId: "Choco_Mountain",
  },
  {
    id: "Moo_Moo_Meadows-to-Choco_Mountain",
    fromCourseId: "Moo_Moo_Meadows",
    toCourseId: "Choco_Mountain",
  },
  {
    id: "Wario_Stadium-to-Choco_Mountain",
    fromCourseId: "Wario_Stadium",
    toCourseId: "Choco_Mountain",
  },
  {
    id: "Salty_Salty_Speedway-to-Dino_Dino_Jungle",
    fromCourseId: "Salty_Salty_Speedway",
    toCourseId: "Dino_Dino_Jungle",
  },
  {
    id: "Koopa_Troopa_Beach-to-Dino_Dino_Jungle",
    fromCourseId: "Koopa_Troopa_Beach",
    toCourseId: "Dino_Dino_Jungle",
  },
  {
    id: "Great_?_Block_Ruins-to-Dino_Dino_Jungle",
    fromCourseId: "Great_?_Block_Ruins",
    toCourseId: "Dino_Dino_Jungle",
  },
  {
    id: "Peach_Beach-to-Dino_Dino_Jungle",
    fromCourseId: "Peach_Beach",
    toCourseId: "Dino_Dino_Jungle",
  },
  {
    id: "Faraway_Oasis-to-Dino_Dino_Jungle",
    fromCourseId: "Faraway_Oasis",
    toCourseId: "Dino_Dino_Jungle",
  },
  {
    id: "DK_Spaceport-to-Crown_City",
    fromCourseId: "DK_Spaceport",
    toCourseId: "Crown_City",
  },
  {
    id: "Desert_Hills-to-Crown_City",
    fromCourseId: "Desert_Hills",
    toCourseId: "Crown_City",
  },
  {
    id: "Whistlestop_Summit-to-Crown_City",
    fromCourseId: "Whistlestop_Summit",
    toCourseId: "Crown_City",
  },
  {
    id: "Choco_Mountain-to-Crown_City",
    fromCourseId: "Choco_Mountain",
    toCourseId: "Crown_City",
  },
  {
    id: "Koopa_Troopa_Beach-to-Crown_City",
    fromCourseId: "Koopa_Troopa_Beach",
    toCourseId: "Crown_City",
  },
  {
    id: "Peach_Stadium-to-Crown_City",
    fromCourseId: "Peach_Stadium",
    toCourseId: "Crown_City",
  },
  {
    id: "Mario_Bros._Circuit-to-Crown_City",
    fromCourseId: "Mario_Bros._Circuit",
    toCourseId: "Crown_City",
  },
  {
    id: "Moo_Moo_Meadows-to-Crown_City",
    fromCourseId: "Moo_Moo_Meadows",
    toCourseId: "Crown_City",
  },
  {
    id: "Faraway_Oasis-to-Crown_City",
    fromCourseId: "Faraway_Oasis",
    toCourseId: "Crown_City",
  },
  {
    id: "Wario_Shipyard-to-Crown_City",
    fromCourseId: "Wario_Shipyard",
    toCourseId: "Crown_City",
  },
  {
    id: "Boo_Cinema-to-Acorn_Heights",
    fromCourseId: "Boo_Cinema",
    toCourseId: "Acorn_Heights",
  },
  {
    id: "Toad's_Factory-to-Acorn_Heights",
    fromCourseId: "Toad's_Factory",
    toCourseId: "Acorn_Heights",
  },
  {
    id: "Dandelion_Depths-to-Acorn_Heights",
    fromCourseId: "Dandelion_Depths",
    toCourseId: "Acorn_Heights",
  },
  {
    id: "Dry_Bones_Burnout-to-Acorn_Heights",
    fromCourseId: "Dry_Bones_Burnout",
    toCourseId: "Acorn_Heights",
  },
  {
    id: "Mario_Circuit-to-Acorn_Heights",
    fromCourseId: "Mario_Circuit",
    toCourseId: "Acorn_Heights",
  },
  {
    id: "DK_Spaceport-to-Koopa_Troopa_Beach",
    fromCourseId: "DK_Spaceport",
    toCourseId: "Koopa_Troopa_Beach",
  },
  {
    id: "Desert_Hills-to-Koopa_Troopa_Beach",
    fromCourseId: "Desert_Hills",
    toCourseId: "Koopa_Troopa_Beach",
  },
  {
    id: "Whistlestop_Summit-to-Koopa_Troopa_Beach",
    fromCourseId: "Whistlestop_Summit",
    toCourseId: "Koopa_Troopa_Beach",
  },
  {
    id: "Dino_Dino_Jungle-to-Koopa_Troopa_Beach",
    fromCourseId: "Dino_Dino_Jungle",
    toCourseId: "Koopa_Troopa_Beach",
  },
  {
    id: "Crown_City-to-Koopa_Troopa_Beach",
    fromCourseId: "Crown_City",
    toCourseId: "Koopa_Troopa_Beach",
  },
  {
    id: "Great_?_Block_Ruins-to-Koopa_Troopa_Beach",
    fromCourseId: "Great_?_Block_Ruins",
    toCourseId: "Koopa_Troopa_Beach",
  },
  {
    id: "Peach_Stadium-to-Koopa_Troopa_Beach",
    fromCourseId: "Peach_Stadium",
    toCourseId: "Koopa_Troopa_Beach",
  },
  {
    id: "Faraway_Oasis-to-Koopa_Troopa_Beach",
    fromCourseId: "Faraway_Oasis",
    toCourseId: "Koopa_Troopa_Beach",
  },
  {
    id: "Salty_Salty_Speedway-to-Great_?_Block_Ruins",
    fromCourseId: "Salty_Salty_Speedway",
    toCourseId: "Great_?_Block_Ruins",
  },
  {
    id: "Dino_Dino_Jungle-to-Great_?_Block_Ruins",
    fromCourseId: "Dino_Dino_Jungle",
    toCourseId: "Great_?_Block_Ruins",
  },
  {
    id: "Peach_Beach-to-Great_?_Block_Ruins",
    fromCourseId: "Peach_Beach",
    toCourseId: "Great_?_Block_Ruins",
  },
  {
    id: "Faraway_Oasis-to-Great_?_Block_Ruins",
    fromCourseId: "Faraway_Oasis",
    toCourseId: "Great_?_Block_Ruins",
  },
  {
    id: "DK_Spaceport-to-Peach_Stadium",
    fromCourseId: "DK_Spaceport",
    toCourseId: "Peach_Stadium",
  },
  {
    id: "Toad's_Factory-to-Peach_Stadium",
    fromCourseId: "Toad's_Factory",
    toCourseId: "Peach_Stadium",
  },
  {
    id: "Choco_Mountain-to-Peach_Stadium",
    fromCourseId: "Choco_Mountain",
    toCourseId: "Peach_Stadium",
  },
  {
    id: "Crown_City-to-Peach_Stadium",
    fromCourseId: "Crown_City",
    toCourseId: "Peach_Stadium",
  },
  {
    id: "Koopa_Troopa_Beach-to-Peach_Stadium",
    fromCourseId: "Koopa_Troopa_Beach",
    toCourseId: "Peach_Stadium",
  },
  {
    id: "Cheep_Cheep_Falls-to-Peach_Stadium",
    fromCourseId: "Cheep_Cheep_Falls",
    toCourseId: "Peach_Stadium",
  },
  {
    id: "Mario_Circuit-to-Peach_Stadium",
    fromCourseId: "Mario_Circuit",
    toCourseId: "Peach_Stadium",
  },
  {
    id: "Moo_Moo_Meadows-to-Peach_Stadium",
    fromCourseId: "Moo_Moo_Meadows",
    toCourseId: "Peach_Stadium",
  },
  {
    id: "Faraway_Oasis-to-Peach_Stadium",
    fromCourseId: "Faraway_Oasis",
    toCourseId: "Peach_Stadium",
  },
  {
    id: "Salty_Salty_Speedway-to-Peach_Beach",
    fromCourseId: "Salty_Salty_Speedway",
    toCourseId: "Peach_Beach",
  },
  {
    id: "Dino_Dino_Jungle-to-Peach_Beach",
    fromCourseId: "Dino_Dino_Jungle",
    toCourseId: "Peach_Beach",
  },
  {
    id: "Great_?_Block_Ruins-to-Peach_Beach",
    fromCourseId: "Great_?_Block_Ruins",
    toCourseId: "Peach_Beach",
  },
  {
    id: "Faraway_Oasis-to-Peach_Beach",
    fromCourseId: "Faraway_Oasis",
    toCourseId: "Peach_Beach",
  },
  {
    id: "Wario_Shipyard-to-Peach_Beach",
    fromCourseId: "Wario_Shipyard",
    toCourseId: "Peach_Beach",
  },
  {
    id: "DK_Pass-to-Cheep_Cheep_Falls",
    fromCourseId: "DK_Pass",
    toCourseId: "Cheep_Cheep_Falls",
  },
  {
    id: "Sky-High_Sundae-to-Cheep_Cheep_Falls",
    fromCourseId: "Sky-High_Sundae",
    toCourseId: "Cheep_Cheep_Falls",
  },
  {
    id: "Dandelion_Depths-to-Cheep_Cheep_Falls",
    fromCourseId: "Dandelion_Depths",
    toCourseId: "Cheep_Cheep_Falls",
  },
  {
    id: "Salty_Salty_Speedway-to-Cheep_Cheep_Falls",
    fromCourseId: "Salty_Salty_Speedway",
    toCourseId: "Cheep_Cheep_Falls",
  },
  {
    id: "Choco_Mountain-to-Cheep_Cheep_Falls",
    fromCourseId: "Choco_Mountain",
    toCourseId: "Cheep_Cheep_Falls",
  },
  {
    id: "Peach_Stadium-to-Cheep_Cheep_Falls",
    fromCourseId: "Peach_Stadium",
    toCourseId: "Cheep_Cheep_Falls",
  },
  {
    id: "Moo_Moo_Meadows-to-Cheep_Cheep_Falls",
    fromCourseId: "Moo_Moo_Meadows",
    toCourseId: "Cheep_Cheep_Falls",
  },
  {
    id: "Faraway_Oasis-to-Cheep_Cheep_Falls",
    fromCourseId: "Faraway_Oasis",
    toCourseId: "Cheep_Cheep_Falls",
  },
  {
    id: "Starview_Peak-to-Cheep_Cheep_Falls",
    fromCourseId: "Starview_Peak",
    toCourseId: "Cheep_Cheep_Falls",
  },
  {
    id: "Wario_Shipyard-to-Cheep_Cheep_Falls",
    fromCourseId: "Wario_Shipyard",
    toCourseId: "Cheep_Cheep_Falls",
  },
  {
    id: "Airship_Fortress-to-Shy_Guy_Bazaar",
    fromCourseId: "Airship_Fortress",
    toCourseId: "Shy_Guy_Bazaar",
  },
  {
    id: "Desert_Hills-to-Shy_Guy_Bazaar",
    fromCourseId: "Desert_Hills",
    toCourseId: "Shy_Guy_Bazaar",
  },
  {
    id: "Choco_Mountain-to-Shy_Guy_Bazaar",
    fromCourseId: "Choco_Mountain",
    toCourseId: "Shy_Guy_Bazaar",
  },
  {
    id: "Mario_Bros._Circuit-to-Shy_Guy_Bazaar",
    fromCourseId: "Mario_Bros._Circuit",
    toCourseId: "Shy_Guy_Bazaar",
  },
  {
    id: "Wario_Stadium-to-Shy_Guy_Bazaar",
    fromCourseId: "Wario_Stadium",
    toCourseId: "Shy_Guy_Bazaar",
  },
  {
    id: "Boo_Cinema-to-Dry_Bones_Burnout",
    fromCourseId: "Boo_Cinema",
    toCourseId: "Dry_Bones_Burnout",
  },
  {
    id: "Toad's_Factory-to-Dry_Bones_Burnout",
    fromCourseId: "Toad's_Factory",
    toCourseId: "Dry_Bones_Burnout",
  },
  {
    id: "Airship_Fortress-to-Dry_Bones_Burnout",
    fromCourseId: "Airship_Fortress",
    toCourseId: "Dry_Bones_Burnout",
  },
  {
    id: "Bowser's_Castle-to-Dry_Bones_Burnout",
    fromCourseId: "Bowser's_Castle",
    toCourseId: "Dry_Bones_Burnout",
  },
  {
    id: "Acorn_Heights-to-Dry_Bones_Burnout",
    fromCourseId: "Acorn_Heights",
    toCourseId: "Dry_Bones_Burnout",
  },
  {
    id: "Mario_Circuit-to-Dry_Bones_Burnout",
    fromCourseId: "Mario_Circuit",
    toCourseId: "Dry_Bones_Burnout",
  },
  {
    id: "Moo_Moo_Meadows-to-Dry_Bones_Burnout",
    fromCourseId: "Moo_Moo_Meadows",
    toCourseId: "Dry_Bones_Burnout",
  },
  {
    id: "Wario_Stadium-to-Dry_Bones_Burnout",
    fromCourseId: "Wario_Stadium",
    toCourseId: "Dry_Bones_Burnout",
  },
  {
    id: "Boo_Cinema-to-Mario_Circuit",
    fromCourseId: "Boo_Cinema",
    toCourseId: "Mario_Circuit",
  },
  {
    id: "Toad's_Factory-to-Mario_Circuit",
    fromCourseId: "Toad's_Factory",
    toCourseId: "Mario_Circuit",
  },
  {
    id: "Bowser's_Castle-to-Mario_Circuit",
    fromCourseId: "Bowser's_Castle",
    toCourseId: "Mario_Circuit",
  },
  {
    id: "Dandelion_Depths-to-Mario_Circuit",
    fromCourseId: "Dandelion_Depths",
    toCourseId: "Mario_Circuit",
  },
  {
    id: "Acorn_Heights-to-Mario_Circuit",
    fromCourseId: "Acorn_Heights",
    toCourseId: "Mario_Circuit",
  },
  {
    id: "Dry_Bones_Burnout-to-Mario_Circuit",
    fromCourseId: "Dry_Bones_Burnout",
    toCourseId: "Mario_Circuit",
  },
  {
    id: "Moo_Moo_Meadows-to-Mario_Circuit",
    fromCourseId: "Moo_Moo_Meadows",
    toCourseId: "Mario_Circuit",
  },
  {
    id: "Starview_Peak-to-Mario_Circuit",
    fromCourseId: "Starview_Peak",
    toCourseId: "Mario_Circuit",
  },
  {
    id: "DK_Spaceport-to-Mario_Bros._Circuit",
    fromCourseId: "DK_Spaceport",
    toCourseId: "Mario_Bros._Circuit",
  },
  {
    id: "Toad's_Factory-to-Mario_Bros._Circuit",
    fromCourseId: "Toad's_Factory",
    toCourseId: "Mario_Bros._Circuit",
  },
  {
    id: "Desert_Hills-to-Mario_Bros._Circuit",
    fromCourseId: "Desert_Hills",
    toCourseId: "Mario_Bros._Circuit",
  },
  {
    id: "Whistlestop_Summit-to-Mario_Bros._Circuit",
    fromCourseId: "Whistlestop_Summit",
    toCourseId: "Mario_Bros._Circuit",
  },
  {
    id: "Choco_Mountain-to-Mario_Bros._Circuit",
    fromCourseId: "Choco_Mountain",
    toCourseId: "Mario_Bros._Circuit",
  },
  {
    id: "Crown_City-to-Mario_Bros._Circuit",
    fromCourseId: "Crown_City",
    toCourseId: "Mario_Bros._Circuit",
  },
  {
    id: "Shy_Guy_Bazaar-to-Mario_Bros._Circuit",
    fromCourseId: "Shy_Guy_Bazaar",
    toCourseId: "Mario_Bros._Circuit",
  },
  {
    id: "Wario_Stadium-to-Mario_Bros._Circuit",
    fromCourseId: "Wario_Stadium",
    toCourseId: "Mario_Bros._Circuit",
  },
  {
    id: "DK_Pass-to-Moo_Moo_Meadows",
    fromCourseId: "DK_Pass",
    toCourseId: "Moo_Moo_Meadows",
  },
  {
    id: "Toad's_Factory-to-Moo_Moo_Meadows",
    fromCourseId: "Toad's_Factory",
    toCourseId: "Moo_Moo_Meadows",
  },
  {
    id: "Dandelion_Depths-to-Moo_Moo_Meadows",
    fromCourseId: "Dandelion_Depths",
    toCourseId: "Moo_Moo_Meadows",
  },
  {
    id: "Choco_Mountain-to-Moo_Moo_Meadows",
    fromCourseId: "Choco_Mountain",
    toCourseId: "Moo_Moo_Meadows",
  },
  {
    id: "Crown_City-to-Moo_Moo_Meadows",
    fromCourseId: "Crown_City",
    toCourseId: "Moo_Moo_Meadows",
  },
  {
    id: "Peach_Stadium-to-Moo_Moo_Meadows",
    fromCourseId: "Peach_Stadium",
    toCourseId: "Moo_Moo_Meadows",
  },
  {
    id: "Cheep_Cheep_Falls-to-Moo_Moo_Meadows",
    fromCourseId: "Cheep_Cheep_Falls",
    toCourseId: "Moo_Moo_Meadows",
  },
  {
    id: "Dry_Bones_Burnout-to-Moo_Moo_Meadows",
    fromCourseId: "Dry_Bones_Burnout",
    toCourseId: "Moo_Moo_Meadows",
  },
  {
    id: "Mario_Circuit-to-Moo_Moo_Meadows",
    fromCourseId: "Mario_Circuit",
    toCourseId: "Moo_Moo_Meadows",
  },
  {
    id: "Salty_Salty_Speedway-to-Faraway_Oasis",
    fromCourseId: "Salty_Salty_Speedway",
    toCourseId: "Faraway_Oasis",
  },
  {
    id: "Dino_Dino_Jungle-to-Faraway_Oasis",
    fromCourseId: "Dino_Dino_Jungle",
    toCourseId: "Faraway_Oasis",
  },
  {
    id: "Crown_City-to-Faraway_Oasis",
    fromCourseId: "Crown_City",
    toCourseId: "Faraway_Oasis",
  },
  {
    id: "Koopa_Troopa_Beach-to-Faraway_Oasis",
    fromCourseId: "Koopa_Troopa_Beach",
    toCourseId: "Faraway_Oasis",
  },
  {
    id: "Great_?_Block_Ruins-to-Faraway_Oasis",
    fromCourseId: "Great_?_Block_Ruins",
    toCourseId: "Faraway_Oasis",
  },
  {
    id: "Peach_Stadium-to-Faraway_Oasis",
    fromCourseId: "Peach_Stadium",
    toCourseId: "Faraway_Oasis",
  },
  {
    id: "Peach_Beach-to-Faraway_Oasis",
    fromCourseId: "Peach_Beach",
    toCourseId: "Faraway_Oasis",
  },
  {
    id: "Cheep_Cheep_Falls-to-Faraway_Oasis",
    fromCourseId: "Cheep_Cheep_Falls",
    toCourseId: "Faraway_Oasis",
  },
  {
    id: "Peach_Stadium-to-Rainbow_Road",
    fromCourseId: "Peach_Stadium",
    toCourseId: "Rainbow_Road",
  },
  {
    id: "DK_Pass-to-Starview_Peak",
    fromCourseId: "DK_Pass",
    toCourseId: "Starview_Peak",
  },
  {
    id: "Sky-High_Sundae-to-Starview_Peak",
    fromCourseId: "Sky-High_Sundae",
    toCourseId: "Starview_Peak",
  },
  {
    id: "Boo_Cinema-to-Starview_Peak",
    fromCourseId: "Boo_Cinema",
    toCourseId: "Starview_Peak",
  },
  {
    id: "Dandelion_Depths-to-Starview_Peak",
    fromCourseId: "Dandelion_Depths",
    toCourseId: "Starview_Peak",
  },
  {
    id: "Cheep_Cheep_Falls-to-Starview_Peak",
    fromCourseId: "Cheep_Cheep_Falls",
    toCourseId: "Starview_Peak",
  },
  {
    id: "Mario_Circuit-to-Starview_Peak",
    fromCourseId: "Mario_Circuit",
    toCourseId: "Starview_Peak",
  },
  {
    id: "Wario_Shipyard-to-Starview_Peak",
    fromCourseId: "Wario_Shipyard",
    toCourseId: "Starview_Peak",
  },
  {
    id: "DK_Pass-to-Wario_Shipyard",
    fromCourseId: "DK_Pass",
    toCourseId: "Wario_Shipyard",
  },
  {
    id: "Sky-High_Sundae-to-Wario_Shipyard",
    fromCourseId: "Sky-High_Sundae",
    toCourseId: "Wario_Shipyard",
  },
  {
    id: "Salty_Salty_Speedway-to-Wario_Shipyard",
    fromCourseId: "Salty_Salty_Speedway",
    toCourseId: "Wario_Shipyard",
  },
  {
    id: "Peach_Beach-to-Wario_Shipyard",
    fromCourseId: "Peach_Beach",
    toCourseId: "Wario_Shipyard",
  },
  {
    id: "Cheep_Cheep_Falls-to-Wario_Shipyard",
    fromCourseId: "Cheep_Cheep_Falls",
    toCourseId: "Wario_Shipyard",
  },
  {
    id: "Starview_Peak-to-Wario_Shipyard",
    fromCourseId: "Starview_Peak",
    toCourseId: "Wario_Shipyard",
  },
  {
    id: "Toad's_Factory-to-Wario_Stadium",
    fromCourseId: "Toad's_Factory",
    toCourseId: "Wario_Stadium",
  },
  {
    id: "Airship_Fortress-to-Wario_Stadium",
    fromCourseId: "Airship_Fortress",
    toCourseId: "Wario_Stadium",
  },
  {
    id: "Bowser's_Castle-to-Wario_Stadium",
    fromCourseId: "Bowser's_Castle",
    toCourseId: "Wario_Stadium",
  },
  {
    id: "Choco_Mountain-to-Wario_Stadium",
    fromCourseId: "Choco_Mountain",
    toCourseId: "Wario_Stadium",
  },
  {
    id: "Crown_City-to-Wario_Stadium",
    fromCourseId: "Crown_City",
    toCourseId: "Wario_Stadium",
  },
  {
    id: "Shy_Guy_Bazaar-to-Wario_Stadium",
    fromCourseId: "Shy_Guy_Bazaar",
    toCourseId: "Wario_Stadium",
  },
  {
    id: "Dry_Bones_Burnout-to-Wario_Stadium",
    fromCourseId: "Dry_Bones_Burnout",
    toCourseId: "Wario_Stadium",
  },
  {
    id: "Mario_Bros._Circuit-to-Wario_Stadium",
    fromCourseId: "Mario_Bros._Circuit",
    toCourseId: "Wario_Stadium",
  },
] as const satisfies readonly TypedRoute[];

export type RouteId = (typeof routes)[number]["id"];
