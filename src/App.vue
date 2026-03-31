<script setup>
import { nextTick, onMounted, ref } from "vue";

const PROMPT = "harmen@dev %";
const lines = ref([]);
const command = ref("");
const outputRef = ref(null);
const inputRef = ref(null);
const history = ref([]);
let historyOffset = -1;
let draftCommand = "";

const files = {
    "about.txt": [
        "Harmen de Vries",
        "Frontend-focused web engineer building deliberate, well-structured systems.",
        "I optimize for clarity, performance, and long-term maintainability.",
    ],
    "tools.txt": [
        "TypeScript",
        "Vue.js",
        "Inertia.js",
        "Tailwind CSS",
        "Laravel",
    ],
    "contact.txt": ["GitHub: github.com/harmendv", "Email: harmendv@gmail.com"],
    "now.txt": [
        "Applying AI pragmatically while evolving alongside the rapidly shifting frontend landscape.",
    ],
};

function appendLine(text, kind = "out") {
    lines.value.push({ text, kind });
    nextTick(scrollToBottom);
}

function appendMany(entries, kind = "out") {
    entries.forEach((entry) => appendLine(entry, kind));
}

function scrollToBottom() {
    if (!outputRef.value) return;
    outputRef.value.scrollTop = outputRef.value.scrollHeight;
}

function focusInput() {
    inputRef.value?.focus();
}

function parseArgs(input) {
    const matches = input.match(/"([^"\\]|\\.)*"|'([^'\\]|\\.)*'|\S+/g) || [];
    return matches.map((token) => {
        if (
            (token.startsWith('"') && token.endsWith('"')) ||
            (token.startsWith("'") && token.endsWith("'"))
        ) {
            return token.slice(1, -1);
        }
        return token;
    });
}

function runCommand(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    appendLine(`${PROMPT} ${trimmed}`, "user");
    history.value.push(trimmed);
    historyOffset = -1;
    draftCommand = "";

    const tokens = parseArgs(trimmed);
    const cmd = (tokens[0] || "").toLowerCase();
    const args = tokens.slice(1);

    const commands = {
        help: () => [
            "Available commands:",
            "help, whoami, about, tools, contact, now, ls, cat <file>, pwd, uname, date, echo <text>, history, clear",
        ],
        whoami: () => "Harmen - Frontend Developer",
        about: () => files["about.txt"],
        tools: () => files["tools.txt"],
        contact: () => files["contact.txt"],
        now: () => files["now.txt"],
        ls: () => {
            const showHidden = args.includes("-a");
            const list = Object.keys(files).filter(
                (key) => showHidden || !key.startsWith(".")
            );
            return list.join("  ");
        },
        cat: () => {
            const target = args[0];
            if (!target) return "usage: cat <file>";
            if (!files[target])
                return `cat: ${target}: No such file or directory`;
            return files[target];
        },
        pwd: () => "/Users/harmen/dev",
        uname: () => "Darwin harmen-terminal 24.0.0 arm64",
        date: () => new Date().toString(),
        echo: () => args.join(" "),
        history: () =>
            history.value.map((entry, idx) => `${idx + 1}  ${entry}`),
        clear: () => {
            lines.value = [];
            return null;
        },
    };

    const result = commands[cmd]?.();
    if (result === null) return;

    if (result === undefined) {
        appendLine(`zsh: command not found: ${cmd}`, "error");
        return;
    }

    if (Array.isArray(result)) {
        appendMany(result, "out");
        return;
    }

    appendLine(result, "out");
}

function onKeydown(event) {
    if (event.key === "Enter") {
        runCommand(command.value);
        command.value = "";
        return;
    }

    if (!history.value.length) return;

    if (event.key === "ArrowUp") {
        event.preventDefault();
        if (historyOffset === -1) draftCommand = command.value;
        if (historyOffset < history.value.length - 1) historyOffset += 1;
        command.value =
            history.value[history.value.length - 1 - historyOffset] || "";
    }

    if (event.key === "ArrowDown") {
        event.preventDefault();
        if (historyOffset > 0) {
            historyOffset -= 1;
            command.value =
                history.value[history.value.length - 1 - historyOffset] || "";
            return;
        }
        historyOffset = -1;
        command.value = draftCommand;
    }
}

onMounted(() => {
    appendMany(
        [
            `Last login: ${new Date().toLocaleString()}`,
            "Welcome to harmen.dev.",
            'Type "help" to see available commands.',
            'Hint: try "ls" and then "cat about.txt".',
        ],
        "sys"
    );
    focusInput();
});
</script>

<template>
    <main
        class="stage"
        @click="focusInput"
    >
        <section
            class="terminal"
            aria-label="Terminal"
        >
            <div
                ref="outputRef"
                class="terminal-body"
            >
                <p
                    v-for="(line, index) in lines"
                    :key="`${index}-${line.text}`"
                    class="line"
                    :class="line.kind"
                >
                    {{ line.text }}
                </p>

                <label
                    class="input-row"
                    for="terminal-input"
                >
                    <span class="prompt">{{ PROMPT }}</span>
                    <input
                        id="terminal-input"
                        ref="inputRef"
                        v-model="command"
                        type="text"
                        autocomplete="off"
                        autocapitalize="none"
                        autocorrect="off"
                        spellcheck="false"
                        @keydown="onKeydown"
                    />
                </label>
            </div>
        </section>
    </main>
</template>
