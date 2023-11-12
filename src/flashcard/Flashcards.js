import React, {useEffect, useState} from "react";
import Button from "../inputs/Button";
import Modal from "../modal/Modal";
import {useSpring, animated} from "react-spring";
import {
    Check,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight, Loader2,
    Pencil, Plus,
    Search,
    Trash, X
} from "lucide-react";

export default function Flashcards() {
    const [loading, set_loading] = useState(true);
    const [offline, set_offline] = useState(false);

    const [show_settings, set_show_settings] = useState(false);
    const [new_deck_modal_is_open, set_new_deck_modal_is_open] = useState(false);

    const [deck_list, set_deck_list] = useState([]);
    const [card_list, set_card_list] = useState([]);

    const [current_deck, set_current_deck] = useState(undefined);
    const [current_card, set_current_card] = useState(undefined);

    const [hide_answer, set_hide_answer] = useState(true);

    const [start_date, set_start_date] = useState(Date.now);

    const settings_props = useSpring({
        to: { visibility: 'visible' },
        from: { visibility: 'hidden' },
        reverse: !show_settings,
    })

    const content_props = useSpring({
        to: { visibility: 'visible' },
        from: { visibility: 'hidden' },
        reverse: show_settings,
    })

    useEffect(() => {
        fetch_decks();
        fetch_card();
    }, [])

    function fetch_decks() {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'test'
            }
        }

        set_start_date(Date.now);

        fetch('http://localhost:8080/flash/deck/all', options)
            .then(async res => {
                const data = await res.json();
                console.log(data)
                set_deck_list(data);
                set_loading(false);
                set_offline(false);
            })
            .catch(err => {
                console.log(err);
                set_loading(false);
                set_offline(true);
            });
    }

    function fetch_card_list(new_deck) {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'test'
            }
        }

        if (new_deck === undefined) return;

        fetch('http://localhost:8080/flash/deck/' + new_deck + "/all", options)
            .then(res => {
                if (res.ok) return res.json();
            })
            .then(data => {
                set_card_list(data);
            })
            .catch(err => {
                console.log(err);
                set_offline(true);
            });
    }

    function fetch_card(new_deck) {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'test'
            }
        }

        if (new_deck === undefined) return;

        fetch('http://localhost:8080/flash/card?deckId=' + new_deck, options)
            .then(res => {
                if (res.ok) return res.json();
            })
            .then(data => {
                set_current_card(data);
            })
            .catch(err => {
                console.log(err);
                set_offline(true);
            });
    }

    function set_deck(new_deck) {
        if (new_deck === current_deck) return;

        set_start_date(Date.now);
        set_current_deck(new_deck);
        fetch_card_list(new_deck);
        fetch_card(new_deck);
        set_hide_answer(true);
    }

    function answer_card(answer) {
        const options = {
            method: 'POST',
            headers: {
                'Authorization': 'test'
            }
        }

        let now = Date.now();
        let studied_seconds = Math.floor((now - start_date) / 1000);

        fetch('http://localhost:8080/flash/card/' + current_card.id + "/" + answer + "?studiedSeconds=" + studied_seconds, options)
            .then(() => {
                set_hide_answer(true);
                fetch_decks();
                fetch_card(current_deck);
            })
            .catch(err => {
                console.log(err)
                set_offline(true);
            });
    }

    const delete_card = (id) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': 'test'
            }
        }

        fetch('http://localhost:8080/flash/card/' + id, options)
            .then(() => {
                fetch_card_list(current_deck);
            })
            .catch(err => {
                console.log(err)
                set_offline(true);
            });
    }

    const update_card = (id, question, answer) => {
        const options = {
            method: 'PATCH',
            headers: {
                'Authorization': 'test'
            }
        }

        fetch('http://localhost:8080/flash/card/' + id + '?question=' + question + '&answer=' + answer, options)
            .then(() => {
                fetch_card_list(current_deck);
            })
            .catch(err => {
                console.log(err)
                set_offline(true);
            });
    }

    const submit_new_deck = () => {
        let name = document.getElementById('title').value;

        const options = {
            method: 'POST',
            headers: {
                'Authorization': 'test'
            }
        }

        fetch('http://localhost:8080/flash/deck?name=' + name, options)
            .then(() => {
                fetch_decks();
            })
            .catch(err => {
                console.log(err)
                set_offline(true);
            });

        set_new_deck_modal_is_open(false);
    }

    const submit_new_card = (question, answer) => {

        const options = {
            method: 'POST',
            headers: {
                'Authorization': 'test'
            }
        }

        fetch('http://localhost:8080/flash/card?deckId=' + current_deck + '&question=' + question + '&answer=' + answer, options)
            .then(() => {
                fetch_card_list(current_deck);
            })
            .catch(err => {
                console.log(err)
                set_offline(true);
            });
    }

    const delete_deck = (id) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': 'test'
            }
        }

        fetch('http://localhost:8080/flash/deck?deckId=' + id, options)
            .then(() => {
                set_current_deck(undefined);
                fetch_decks();
            })
            .catch(err => {
                console.log(err)
                set_offline(true);
            });
    }

    function do_show_settings(flag) {
        set_show_settings(flag);
        set_hide_answer(true);
        fetch_decks();
    }

    function get_decks() {
        const decks = [];
        deck_list.forEach(item => decks.push(<DeckEntry key={item.id} deck={item} current_deck={current_deck} set_deck={set_deck} show_settings={show_settings} set_show_settings={do_show_settings} delete_deck={delete_deck}></DeckEntry>));
        return decks;
    }

    function reload() {
        set_loading(true);
        fetch_decks();
    }

    if (loading) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-200 gap-5 bg-main-dark">
                <Loader2 className="animate-spin" size={40} weight="fill" />
            </div>
        );
    }

    if (offline) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-main-dark">
                <div className="bg-main-darkest flex flex-col items-center justify-center gap-5 p-5 rounded-md border border-main-light">
                    <div className="text-neutral-400">Can't reach server!</div>
                    <Button onClick={reload} type="primary">Reload</Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="w-full h-full relative">
                <animated.div className="w-full h-full relative flex" style={content_props}>
                    <div className="w-[250px] min-w-[250px] h-full bg-main-dark">
                        <div className="h-min m-2 flex flex-col gap-2 text-sm">
                            <div onClick={() => set_new_deck_modal_is_open(true)} className="h-10 rounded-md cursor-pointer border border-main-light flex items-center text-neutral-300 px-2 hover:bg-main transition duration-200 gap-2">
                                <Plus size={18} weight="fill" />
                                <div>New Deck</div>
                            </div>
                            {get_decks()}
                        </div>
                    </div>

                    <div className="flex-grow h-full flex flex-col">
                        <Card deck={current_deck} card={current_card} answer_card={answer_card} hide_answer={hide_answer} set_hide_answer={set_hide_answer}/>
                    </div>
                </animated.div>

                <animated.div style={settings_props} className="absolute shadow bg-main-dark border-r border-main-light box flex justify-center items-center top-0 left-0 h-content w-full z-40">
                    <Settings close={() => do_show_settings(false)} is_closed={!show_settings} cards_list={card_list} delete_card={delete_card} submit_new_card={submit_new_card} update_card={update_card}></Settings>
                </animated.div>
            </div>

            <Modal title="New Deck" open={new_deck_modal_is_open} doClose={() => set_new_deck_modal_is_open(false)}>
                    <div className="w-72">
                        <label htmlFor="title" className="fixed text-sm text-neutral-300 font-bold p-2 pt-1.5">Name</label>
                        <input autoFocus={true} id="title" type="text" className="w-full rounded bg-main border border-neutral-600 px-2 pt-7 pb-2 text-neutral-400 text-sm" maxLength={32}/>
                        <Button onClick={submit_new_deck} type='success' >Save</Button>
                        <Button onClick={() => set_new_deck_modal_is_open(false)}>Cancel</Button>
                    </div>
            </Modal>
        </>
    );
}

function Settings({close, is_closed, cards_list, delete_card, submit_new_card, update_card}) {

    const [delete_modal_open, set_delete_modal_open] = useState(false);
    const [new_modal_open, set_new_modal_open] = useState(false);
    const [edit_modal_open, set_edit_modal_open] = useState(false);

    const [selected_card, set_selected_card] = useState();

    const [question_content, set_question_content] = useState("");
    const [answer_content, set_answer_content] = useState("");

    const [search_focused, set_search_focused] = useState(false);
    const [search_content, set_search_content] = useState("");

    function new_card() {
        let question = document.getElementById('question').value;
        let answer = document.getElementById('answer').value;
        submit_new_card(question, answer);
    }

    function do_card_update() {
        let question = document.getElementById('new_question').value;
        let answer = document.getElementById('new_answer').value;
        update_card(selected_card.id, question, answer);
    }

    function do_close() {
        clear();
        close();
    }

    function clear() {
        set_search_content("");
        set_search_focused(false);
    }

    let listener = function(e) {
        if (e.key === 'f' && e.ctrlKey) {
            document.getElementById("search-text").focus();
        }
        else if (e.key === 'Escape') {
            do_close();
        }
    };

    if (is_closed) {
        document.removeEventListener('keydown', listener);
        return null;
    }

    document.addEventListener('keydown', listener);

    function search_end_content() {
        if (search_content.length > 0) {
            return (<X className="text-neutral-400 cursor-pointer" onClick={clear} size={18}></X>);
        }
        if (!search_focused) {
            return (
                <div className="text-neutral-600 text-xs">
                    Ctrl + F
                </div>
            );
        }
    }

    function filter_card(card, search_content) {
        let question = card.content.question.toLowerCase();
        let solution = card.content.solution.toLowerCase();
        let search = search_content.toLowerCase();
        return search.length === 0 || question.includes(search) || solution.includes(search)
    }

    function open_delete_modal(card, e) {
        set_selected_card(card);
        set_question_content(card.content.question);
        set_answer_content(card.content.solution);
        set_delete_modal_open(true);
        e.stopPropagation();
    }

    function open_edit_modal(card) {
        set_selected_card(card);
        set_question_content(card.content.question);
        set_answer_content(card.content.solution);
        set_edit_modal_open(true);
    }

    function get_table_content(search_content) {
        let entries = [];
        cards_list.filter(card => filter_card(card, search_content)).forEach(card => entries.push(
            <tr key={card.id} className="h-10 text-neutral-200 text-sm cursor-pointer rounded-full hover:bg-main-light group" onClick={() => open_edit_modal(card)}>
                <td className="px-4 whitespace-nowrap overflow-hidden overflow-ellipsis rounded-l-md">{card.content.question}</td>
                <td className="px-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{card.content.solution}</td>
                <td className="px-4 text-center">-</td>
                <td className="px-4 rounded-r-md">
                    <div className="flex justify-end">
                        <Trash size={18} className="invisible group-hover:visible hover:text-neutral-400" onClick={(e) => open_delete_modal(card, e)}/>
                    </div>
                </td>
            </tr>
        ));
        return entries;
    }

    return (
        <>
            <div className="w-full h-full flex flex-col">
                <div className="bg-main h-14 p-2 w-full flex gap-2">
                    <div className="flex justify-center h-full aspect-square items-center text-neutral-400 cursor-pointer" onClick={do_close}>
                        <ChevronLeft size={24} ></ChevronLeft>
                    </div>

                    <div className="bg-main-darkest flex items-center p-2 gap-2 rounded text-sm text-gray-200 border border-main-light relative">
                        <Search size={18} className="text-gray-400"/>
                        <input id="search-text" type="text" value={search_content} onInput={e => set_search_content(e.target.value)} placeholder={search_focused ? "" : "Filter"} className="bg-transparent" onFocus={() => set_search_focused(true)} onBlur={() => set_search_focused(false)} />
                        <div className="w-12 flex justify-end">
                            {search_end_content(search_content)}
                        </div>
                    </div>

                    <div className="flex items-center justify-end pl-2">
                        <Button type="success" onClick={() => set_new_modal_open(true)}>New</Button>
                    </div>
                </div>

                <div className="w-full p-4 gap-4 overflow-y-scroll no-scrollbar overflow-x-hidden">
                    <table className="w-full table-fixed ">
                        <thead>
                            <tr className="h-10 text-left text-neutral-400 bg-main-darkest overflow-hidden">
                                <th className="px-4 w-4/12 font-normal rounded-l-md">Question</th>
                                <th className="px-4 w-4/12 font-normal">Answer</th>
                                <th className="px-4 text-center w-1/12 font-normal">Due Date</th>
                                <th className="w-1/12 rounded-r-md"></th>
                            </tr>
                            <tr>
                                <td className="h-2"></td>
                            </tr>
                        </thead>

                        <tbody>
                            {get_table_content(search_content)}
                        </tbody>

                    </table>
                </div>
            </div>

            <Modal title="Delete Card" open={delete_modal_open} do_close={() => set_delete_modal_open(false)}>
                <div className="flex flex-col gap-2 w-96">
                    <div className="flex flex-col justify-center border border-neutral-600 rounded-md bg-main p-2 gap-1">
                        <div className="text-sm font-bold text-neutral-300">Question</div>
                        <div className="text-sm text-neutral-400">{question_content}</div>
                    </div>

                    <div className="flex flex-col justify-center border border-neutral-600 rounded-md bg-main p-2 gap-1">
                        <div className="text-sm font-bold text-neutral-300">Answer</div>
                        <div className="text-sm text-neutral-400">{answer_content}</div>
                    </div>

                    <Button onClick={() => set_delete_modal_open(false)}>Cancel</Button>
                    <Button onClick={() => {
                        delete_card(selected_card.id);
                        set_delete_modal_open(false);
                    }} type='danger' >Delete</Button>
                </div>
            </Modal>

            <Modal title="Create new Card" open={new_modal_open} do_close={() => set_new_modal_open(false)}>
                <div className="flex flex-col gap-2 w-96">
                    <div className="">
                        <label htmlFor="question" className="fixed text-sm text-neutral-300 font-bold p-2 pt-1.5">Question</label>
                        <input id="question" type="text" className="w-full rounded bg-main border border-neutral-600 px-2 pt-7 pb-2 text-neutral-400 text-sm" maxLength={128}/>
                    </div>

                    <div className="">
                        <label htmlFor="answer" className="fixed text-sm text-neutral-300 font-bold p-2 pt-1.5">Answer</label>
                        <input id="answer" type="text" className="w-full rounded bg-main border border-neutral-600 px-2 pt-7 pb-2 text-neutral-400 text-sm" maxLength={128}/>
                    </div>

                    <Button onClick={() => set_new_modal_open(false)}>Cancel</Button>
                    <Button onClick={() => {
                        new_card();
                        set_new_modal_open(false);
                    }} type='success' >Create</Button>
                </div>
            </Modal>

            <Modal title="Edit Card" open={edit_modal_open} do_close={() => set_edit_modal_open(false)}>
                <div className="flex flex-col gap-2 w-96">
                    <div className="">
                        <label htmlFor="question" className="fixed text-sm text-neutral-300 font-bold p-2 pt-1.5">Question</label>
                        <input defaultValue={question_content} id="new_question" type="text" className="w-full rounded bg-main border border-neutral-600 px-2 pt-7 pb-2 text-neutral-400 text-sm" maxLength={128}/>
                    </div>

                    <div className="">
                        <label htmlFor="answer" className="fixed text-sm text-neutral-300 font-bold p-2 pt-1.5">Answer</label>
                        <input defaultValue={answer_content} id="new_answer" type="text" className="w-full rounded bg-main border border-neutral-600 px-2 pt-7 pb-2 text-neutral-400 text-sm" maxLength={128}/>
                    </div>

                    <Button onClick={() => set_edit_modal_open(false)}>Cancel</Button>
                    <Button onClick={() => {
                        delete_card(selected_card.id);
                        set_edit_modal_open(false);
                    }} type='danger' >Delete</Button>
                    <Button onClick={() => {
                        do_card_update();
                        set_edit_modal_open(false);
                    }} type='success' >Update</Button>
                </div>
            </Modal>
        </>
    );
}

function DeckEntry({deck, current_deck, set_deck, show_settings, set_show_settings, delete_deck}) {

    const [modal_open, set_modal_open] = useState(false);

    function submit_delete(deckId) {
        delete_deck(deckId);
        set_modal_open(false);
    }

    function get_deck_badge(deck) {
        if (deck.cardCountToStudy !== 0) {
            return (
                <div className="bg-cyan-700 h-5 w-6 flex justify-center items-center rounded text-xs">
                    {deck.cardCountToStudy}
                </div>
            );
        }

        return (
            <div className="bg-green-700 h-5 w-6 flex justify-center items-center rounded text-xs">
                <Check size={14} weight="fill" />
            </div>
        );
    }

    return (
        <>
            <div onClick={() => set_deck(deck.id)} className={"h-10 rounded-md cursor-pointer group " + (current_deck === deck.id ? "bg-main-light" : "hover:bg-main")}>
                <div className="flex items-center h-full p-2 gap-2 text-neutral-200">
                    {get_deck_badge(deck)}
                    <div className="uppercase whitespace-nowrap">{deck.name}</div>
                    <div className={"flex flex-grow justify-end opacity-0 group-hover:opacity-100 gap-1 " + (current_deck === deck.id ? "visible" : "hidden")}>
                        <Pencil size={18} onClick={() => set_show_settings(!show_settings)} className="hover:text-gray-100 text-gray-400 transition duration-200" weight="light" />
                        <Trash size={18} onClick={() => set_modal_open(true)} className="hover:text-gray-100 text-gray-400 transition duration-200" weight="light"/>
                    </div>
                </div>

            </div>

            <Modal title="Delete Deck" open={modal_open} do_close={() => set_modal_open(false)}>
                <div className="flex flex-col gap-2 w-80">
                    <div className="flex flex-col justify-center border border-neutral-600 rounded-md bg-main p-2 gap-1">
                        <div className="text-sm font-bold text-neutral-300 uppercase">{deck.name}</div>
                    </div>

                    <Button onClick={() => set_modal_open(false)}>Cancel</Button>
                    <Button onClick={() => submit_delete(deck.id)} type='danger' >Delete</Button>
                </div>
            </Modal>
        </>
    );
}

function Card({deck, card, answer_card, hide_answer, set_hide_answer}) {

    const answer_props = useSpring({
        to: { flexGrow: 1,},
        from: { flexGrow: 0, height: 0},
        reset: true,
        immediate: hide_answer,
        reverse: hide_answer,
        config: {duration: 0},
    })

    function submit(answer) {
        set_hide_answer(true);
        answer_card(answer);
    }

    function content() {
        if (deck === undefined) {
            return (
                <div className="w-full h-full flex items-center justify-center text-base gap-2">
                    <div className="text-gray-400">No deck selected</div>
                </div>
            );
        }

        if (card === undefined) {
            return (
                <div className="w-full h-full flex items-center justify-center text-base gap-2">
                    <div className="text-gray-400">No Cards left for this Deck</div>
                </div>
            );
        }

        return (
            <>
                <div onClick={() => set_hide_answer(false)} className="grow cursor-pointer p-1 flex rounded-md flex-col items-center text-4xl text-center break-words text-neutral-200 justify-center items-center">
                    {card.content.question}
                </div>
                <animated.div style={answer_props} className="flex overflow-hidden flex-col items-center justify-center">
                    <div className="text-4xl text-center break-words text-neutral-200 flex-grow">
                        {card.content.solution}
                    </div>
                    <div className="flex gap-4">
                        <div onClick={() => submit('AGAIN')} className="h-10 bg-main-dark aspect-square rounded-md cursor-pointer border border-main-light flex items-center justify-center text-neutral-300 hover:bg-main transition duration-200 font-semibold">
                            <ChevronsLeft size={22} weight="bold" />
                        </div>
                        <div onClick={() => submit('HARD')} className="h-10 bg-main-dark aspect-square rounded-md cursor-pointer border border-main-light flex items-center justify-center text-neutral-300 hover:bg-main transition duration-200 font-semibold">
                            <ChevronRight size={22} weight="bold" />
                        </div>
                        <div onClick={() => submit('GOOD')} className="h-10 bg-main-dark aspect-square rounded-md cursor-pointer border border-main-light flex items-center justify-center text-neutral-300 hover:bg-main transition duration-200 font-semibold">
                            <ChevronRight size={22} weight="bold" />
                        </div>
                        <div onClick={() => submit('EASY')} className="h-10 bg-main-dark aspect-square rounded-md cursor-pointer border border-main-light flex items-center justify-center text-neutral-300 hover:bg-main transition duration-200 font-semibold">
                            <ChevronsRight size={22} weight="bold" />
                        </div>
                    </div>
                </animated.div>
            </>
    );
    }


    return (
        <div className="h-full w-full flex flex-col bg-main">
            <div className="flex-grow flex-col w-full p-6 flex">
                {content()}
            </div>
        </div>
    );
}
