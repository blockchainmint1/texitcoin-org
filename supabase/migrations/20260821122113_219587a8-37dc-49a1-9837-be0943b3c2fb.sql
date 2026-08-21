insert into public.screenplay_seasons (slug, number, title, subtitle, era, logline, intro_markdown, honesty_note)
values
('season-1', 1, 'Molten', 'From the coin floor to the first tank', '2017 – 2024',
 $md$A Texas coin manufacturer watches his factory try to kill him, sells it to pay everyone he owes, and bets what is left on a blockchain nobody has heard of — in a garage, in August, in Texas.$md$,
 $md$Season One is a burn-the-boats season. It opens in a working mint — noise, heat, metal — and ends in a room full of quiet, humming tanks. Everything in between is Bobby losing the thing he built and refusing to lose the people who built it with him.

The engine of the season is a simple, brutal question that gets asked in five different ways: **what are you willing to sell to keep your word?** The factory. The house's cushion. The comfort of being right. Kira's coin collection, sitting in a safe in the hallway like a loaded argument.

Tonally: hot, loud, funny in the way that only exhausted people are funny. The neighbors are a Greek chorus with a beer fridge. The stakes are a daughter's kidney and a promise to creditors that nobody in the industry expected to be kept.$md$,
 $md$Real: the casting failures, the JM Bullion rejection, selling the factory and paying the debts, the garage L3s, the Consensus expo ban, the flop of a launch party, the Bitmain trip, immersion cooling, Samantha's illness, and November 2024. Invented: most dialogue, the compressed timeline, the composite buyer characters, and the specific night the auction happens.$md$),
('season-2', 2, 'Wheels Up', 'Everything works, and that is the problem', '2024 – 2026',
 $md$The bet pays off — supercars, sold-out rooms, a third of a billion in network value — and every win lands with the faint sound of a door being kicked in somewhere off-screen.$md$,
 $md$Season Two is the season of the beautiful problem. Nothing goes wrong for nine episodes' worth of story, and it is unbearable.

Bobby goes from the back row of a Bitmain conference to the keynote stage of the same event. The team grows faster than the culture can hold. There are cars, houses, closings, and a leadership retreat in Thailand that looks like a vacation and functions like a coronation. Rob, a big gentle man who has never once raised his voice, becomes the moral center of the office — which is how you know the show is going to hurt him.

The camera keeps finding things the characters don't: an unopened envelope in the mail pile, a state seal on a letterhead, a phone that rings twice and stops. The season ends with two cuts on the same afternoon — a front door coming off its hinges in Texas, and a Gulfstream rotating off a runway eight thousand miles away.$md$,
 $md$Real: the growth curve, the WDMS keynote, the leadership trip, the property purchases, the valuation, and the Texas cease-and-desist. Invented: the office ensemble's day-to-day, the specific timing of the raid, and every antagonist's interior life.$md$),
('season-3', 3, 'The John Galt Line', 'Dismantling the railroad to save the rails', '2026',
 $md$Cut off from his own company by a state order, Bobby rebuilds it from overseas with a skeleton crew, tearing down everything that is not load-bearing — and walks into the first crypto trial that the whole internet watches live.$md$,
 $md$Season Three is quiet, cold, and the best-written season of the three. No supercars. Airport hotels, borrowed offices, a laptop on a hotel desk at 4 a.m. because the only overlap with Texas is the middle of the night.

Sales are shut off globally. Good people lose jobs in a montage that refuses to be a montage — it is one long scene, one conversation at a time. What is left is engineering: tools, utility, the unglamorous work of making the thing actually useful while being publicly accused of it being worthless.

The back half is courtroom. Streamed, clipped, memed, and argued about in real time by an audience that has never once been allowed to watch this kind of proceeding. The season — and the series — ends on a judge's ruling at Christmas 2026, and on the shot the whole show has been building toward: a man reading a document alone, and then looking up.$md$,
 $md$Real: the shutdown of sales, the overseas period, the livestreamed SOAH hearing, and the pending ruling. Invented: everything inside the deliberation, the opposing counsel as a character, and the ending — because it has not happened yet.$md$)
on conflict (slug) do update set
  title = excluded.title, subtitle = excluded.subtitle, era = excluded.era,
  logline = excluded.logline, intro_markdown = excluded.intro_markdown,
  honesty_note = excluded.honesty_note, updated_at = now();

delete from public.screenplay_beats where credit is null;

insert into public.screenplay_beats (season_slug, sort_order, kind, title, body) values
('season-1', 10, 'scene', 'Cold open — molten',
 $md$INT. TEXAS MINT FLOOR — NIGHT. A casting machine the size of a truck engine coughs, then lets go. Molten silver goes where molten silver is never supposed to go. Somebody's sleeve is on fire and nobody screams, because on this floor that is a Tuesday. BOBBY beats it out with a shop rag, checks the guy, and goes right back to the machine — because the machine is the only thing standing between this building and thirty families.

We hold on his face lit orange by a crucible. Title card. This is a business that makes honest money by nearly killing people for it.$md$),
('season-1', 20, 'scene', 'The order that was going to fix everything',
 $md$A political-novelty coin order — the big one, the one that clears the year. Six-figure tooling. Three shifts. Everyone works Thanksgiving.

Then the call: the distributor is out. Compliance, optics, a lawyer somewhere got nervous. No fault, no fraud, no recourse. Just a pallet of finished product that is now worth melt and a receivable that will never arrive.

Bobby says "okay" four times in the call, hangs up, and stands in the parking lot for a very long time. KIRA watches from the office window and knows exactly what the length of that pause costs.$md$),
('season-1', 30, 'scene', 'Thirty days of runway',
 $md$The kitchen-table math scene. Bobby lays it out with a Sharpie on the back of an invoice: payroll, vendors, the die shop, the guy in Ohio who fronted them blanks on a handshake.

MATT — the neighbor, who has never in his life finished a sentence and started a new one instead — is somehow in the kitchen, eating their food, offering to "know a guy." JOSH is behind him, quieter, worse ideas. Kira asks the question the season is built on: *if we can't pay everybody, who do we pay?*

Bobby's answer: everybody. Which means selling the thing that makes the money.$md$),
('season-1', 40, 'scene', 'The auction',
 $md$They sell the factory. Not in a montage — in a single afternoon, with a clipboard, while men Bobby has known for a decade carry his presses out on forklifts.

The last item is a hand-cut die he made himself. Nobody bids. He puts it in his truck.

That night, every creditor gets paid. Every one. The industry expected him to file, walk, and reopen under a new LLC by spring — half the room did exactly that in 2013 — and instead he wires out until the account reads a number that makes Kira put her hand over her mouth.

What is left goes into TEXITcoin.$md$),
('season-1', 50, 'scene', 'Garage weather',
 $md$INT. TWO-CAR GARAGE — AUGUST — 114°F. Nine Antminer L3s screaming on a plywood bench, box fans doing nothing, a window unit sagging out of a hole cut with a jigsaw. The house lights dim every time a machine spins up.

Samantha, seventeen, does homework at the kitchen table wearing ear defenders. Kira has stopped commenting on the electric bill because commenting requires hope.

JOHNNY — the Texas neighbor, a man who owns four welders and no shirts — turns up with a diesel generator, a trailer, and a plan so illegal it never makes it into the episode. He stays.$md$),
('season-1', 60, 'scene', 'Booth 1147',
 $md$They spend nearly everything on a launch: booth, badges, ballroom, open bar, a bespoke coin for every attendee.

Two days out, conference compliance pulls the plug on the promotion. No token talk on the expo floor, no signage, no handouts. Legal risk. Bobby argues in a hallway with a twenty-six-year-old holding a laminated badge and loses on principle and on merit.

The team spends the night hand-lettering the only thing they are allowed to say: an address, a time, and the words *come find out*.$md$),
('season-1', 70, 'scene', 'The party nobody came to',
 $md$INT. HOTEL BALLROOM — NIGHT. A room for four hundred. Nineteen people, six of whom flew in on Bobby's dime and three of whom are neighbors.

The band plays the full set anyway. Matt gives an unrequested twenty-minute toast that starts as a disaster and lands, accidentally, as the thesis of the show. Johnny cries at the shrimp.

Bobby works the room like it is packed, because the nineteen people who came deserve the room he promised them. Last shot: the empty tables, the good linens, and a bar tab that will show up as a plot point in three episodes.$md$),
('season-1', 80, 'scene', 'The mine is dying',
 $md$Hashrate falling. Boards cooking. Two machines dead on the bench with capacitors blown clean off. The math says they are twelve weeks from having converted a factory into a very expensive space heater.

Kira opens the hallway safe. Inside: her coins — the collection she has carried through every move, every failure, the one asset that was never on the table.

She puts them on the table. Bobby says no. It is the biggest fight of the season and neither of them raises their voice.$md$),
('season-1', 90, 'scene', 'Shenzhen',
 $md$The Bitmain World Digital Mining Summit. Bobby, in a borrowed suit, in the back row, understanding maybe forty percent of what is said.

Then a side room, half-empty, a demo nobody is excited about: a rack of hashboards fully submerged in dielectric fluid, silent, cool, running harder than anything in that garage will ever run.

He watches the tank for a full minute without speaking. The music drops out. This is the conversion scene, and it happens without a single line of dialogue.$md$),
('season-1', 100, 'scene', 'Tank one',
 $md$Building the first immersion tank out of a food-grade IBC tote, a pump from a pool-supply store, a heat exchanger Johnny welds in the driveway, and forty gallons of fluid that costs more than the truck it arrived in.

The first fill leaks. The second fill leaks. The third one holds, and the garage goes quiet for the first time in two years — not off, just *quiet* — and the whole family stands there listening to nothing.

Kira, tearful, furious, relieved: "That's it? That's what it sounds like?"$md$),
('season-1', 110, 'scene', 'Bangkok',
 $md$Samantha's kidney fails. The American number is impossible. The Thai number is merely brutal.

They go. Bobby runs the mine from a hospital corridor on a phone with 11% battery, on Texas time, in a country twelve hours off. Johnny and Josh keep the tanks alive by video call, doing chemistry they do not understand, at 3 a.m., correctly.

The episode's best scene is Matt — who has not shut up for the entire season — sitting with Kira in a waiting room and saying absolutely nothing for four straight minutes.$md$),
('season-1', 120, 'scene', 'November 2024',
 $md$Profitable. Not spectacularly — profitably. A spreadsheet cell turns from red to black and the whole season lands on it.

The why is the point: the orders come from the coin industry. From the dealers, the melters, the die shops, the same men who watched him pay every creditor and remembered. A guy in Ohio who was owed $40,000 and got it, buying miners.

Bobby, to the room, quietly: "We didn't earn this in the last two years. We earned it the day we paid everybody."

Season out.$md$),
('season-2', 10, 'scene', 'Cold open — the same stage',
 $md$Match cut from Season One's back row: same conference, same lighting rig, same carpet — and Bobby walks out to the keynote podium. Applause. He looks at the back row where he sat.

Whatever the show is going to take away from him, this is the thing it takes away first.$md$),
('season-2', 20, 'scene', 'The office',
 $md$Forty people where there were four. ROB — enormous, soft-spoken, hugs everyone, cannot be provoked — runs support and is functionally the company's conscience. TIM, built like a vending machine and twice as motivated, runs sales and is genuinely, unsettlingly good at it. GAIGE has a baby that is somehow at every meeting, in every frame, on every Zoom, and no one questions it.

Comedy engine: the office runs on hijinks, group chats, and a whiteboard nobody is allowed to erase. Drama engine: nobody in this building has ever seen a downturn.$md$),
('season-2', 30, 'scene', 'Supercars',
 $md$The money arrives faster than the vocabulary for it. A McLaren in the warehouse bay next to a tank rack. A team member buys a boat he cannot dock.

Bobby's version of restraint — a truck, paid cash — reads to the team as permission. Kira notices the shift before he does: the culture stops being "we paid everybody" and starts being "we won."$md$),
('season-2', 40, 'scene', 'Thailand, again',
 $md$The leadership trip. The same country where Samantha's surgery happened, now booked as a reward.

Bobby takes the leaders to the hospital corridor. It plays as inspiring. Two of them are visibly bored. That shot is the season's whole warning.$md$),
('season-2', 50, 'scene', 'A third of a billion',
 $md$The valuation crosses a number nobody planned for. Properties close. An event fills a venue that the launch party could have fit inside eleven times.

Direct rhyme with the ballroom: same band, packed room, Matt's toast — now a tradition, now on a jumbotron, now genuinely moving. Johnny cries at the shrimp again.$md$),
('season-2', 60, 'scene', 'The envelope',
 $md$A certified letter sits in a mail pile for nine days because the front desk is a temp who quit.

We see the state seal. Nobody in the show does. The audience carries it for three episodes like a stone in a shoe.$md$),
('season-2', 70, 'scene', 'Rob knows first',
 $md$Support tickets have a shape, and Rob can read it: the same three questions from the same kind of caller, in the same week, all asking about licensure.

He brings it to Tim, who tells him it is nothing. He brings it to legal, who tells him it is fine. He writes a memo. He does not send it. The memo shows up again in Season Three, and it destroys him.$md$),
('season-2', 80, 'scene', 'Wheels up',
 $md$The last twelve minutes are one cross-cut.

Texas: a knock, a badge, a door coming off its hinges, forty people standing up at their desks at once, a baby crying, Gaige holding her, Rob not moving at all.

Overseas-bound at 41,000 feet: Bobby's phone connects to the plane's wifi and does not stop buzzing for a full minute of screen time. He reads the first line of the cease-and-desist. The word is *fraud*.

He closes the laptop. Looks out the window. The plane keeps going.$md$),
('season-2', 90, 'scene', 'Rob quits',
 $md$Season tag. Rob resigns by handwritten letter, apologizing to Bobby for leaving and to himself for staying too long.

He does not sell his position. That detail is the last shot of the season and the first argument of the next.$md$),
('season-3', 10, 'scene', 'Cold open — 4 a.m. anywhere',
 $md$A hotel desk. A laptop. A time-zone converter open in a browser tab. Bobby's entire company now fits in a Notes app titled *WHAT STILL WORKS*.

Voiceover is banned in this show, so instead: forty seconds of a man typing, deleting, and typing again.$md$),
('season-3', 20, 'scene', 'Sales off',
 $md$Global shutdown. The scene the season is built around is not the announcement — it is the calls afterward.

One long sequence, one conversation at a time, forty people. Tim takes it like a competitor. Gaige asks about insurance for the baby. The last call is to Johnny, who says "I'm not on payroll anyway" and hangs up before Bobby can answer.$md$),
('season-3', 30, 'scene', 'Dismantling the line',
 $md$Atlas Shrugged, Part Two, played straight and sad: tearing down the infrastructure they spent Season Two building, to keep the core alive.

Racks sold. Offices closed. A tank drained — the *first* tank, the IBC tote with Johnny's welds on it — and Bobby cannot be in the room for it.$md$),
('season-3', 40, 'scene', 'Building anyway',
 $md$The engineering season. Explorer, wallet, layer two, tooling, docs. Unglamorous, uncinematic, and shot like a heist.

The joke that runs all season: the company is accused of selling something worthless, and spends every waking hour making it worth something.$md$),
('season-3', 50, 'scene', 'The memo',
 $md$Discovery turns up Rob's unsent memo.

Both sides want it. For the state, it is knowledge. For the defense, it is a support guy doing his job in a company that answered him honestly. Rob has to testify about the worst thing he ever did not do.$md$),
('season-3', 60, 'scene', 'The trial of the century',
 $md$Livestreamed. Clipped. Memed in real time by an audience of thousands who have never been allowed to watch a securities proceeding before and cannot believe what it looks like from the inside.

Quinn, the defense attorney, runs a masterclass in front of an audience that is half hostile, half devoted, and entirely watching. The chat scrolls beside the testimony like a Greek chorus with terrible opinions.$md$),
('season-3', 70, 'scene', 'They had nothing',
 $md$The state rests. The room reads it before the lawyers do.

Bobby's own testimony is the series' longest single take: no objection, no interruption, a man explaining honest money to a tribunal, on the record, forever.$md$),
('season-3', 80, 'scene', 'Christmas 2026',
 $md$The ruling arrives on a holiday, by email, because of course it does.

Kira reads it over his shoulder. Samantha — healthy, twenty-something, mid-argument with Matt about something stupid in the next room — does not notice for a full thirty seconds.

Bobby reads the document alone, and then looks up.

Cut to black. End of series — unless the ruling says otherwise, and it hasn't been written yet, because it hasn't happened yet.$md$);