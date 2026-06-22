<script setup lang="ts"></script>
<template>
    <pre
        class="font-mono text-[13px] leading-[1.7] text-white/86 bg-black/45 border border-white/8 rounded-[8px] py-[18px] px-[20px] overflow-x-auto whitespace-pre"
    ><span class="text-[var(--purple)]">export function</span> <span class="text-[var(--pink)]">sanitizeSdp</span>(sdp: <span class="text-sky-300">string</span>): <span class="text-sky-300">string</span> {
    <span class="text-white/40 italic">// Normalise all CR/LF variants to plain \n, then split cleanly.</span>
    <span class="text-[var(--purple)]">const</span> lines = sdp
        .<span class="text-[var(--pink)]">replace</span>(<span class="text-amber-300">/\r\n/g</span>, <span class="text-emerald-300">'\n'</span>)
        .<span class="text-[var(--pink)]">replace</span>(<span class="text-amber-300">/\r/g</span>, <span class="text-emerald-300">'\n'</span>)
        .<span class="text-[var(--pink)]">split</span>(<span class="text-emerald-300">'\n'</span>)
        .<span class="text-[var(--pink)]">filter</span>(
            (line) =&gt;
                line !== <span class="text-emerald-300">''</span> &amp;&amp;
                !line.<span class="text-[var(--pink)]">startsWith</span>(<span class="text-emerald-300">'a=ssrc:'</span>) &amp;&amp;
                !line.<span class="text-[var(--pink)]">startsWith</span>(<span class="text-emerald-300">'a=ssrc-group:'</span>),
        )

    <span class="text-white/40 italic">// SDP requires every line to end with CRLF (RFC 4566 §5).</span>
    <span class="text-[var(--purple)]">return</span> lines.<span class="text-[var(--pink)]">join</span>(<span class="text-emerald-300">'\r\n'</span>) + <span class="text-emerald-300">'\r\n'</span>
}</pre>
</template>
