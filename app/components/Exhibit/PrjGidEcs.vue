<script setup lang="ts"></script>
<template>
    <pre
        class="font-mono text-[13px] leading-[1.7] text-white/86 bg-black/45 border border-white/8 rounded-[8px] py-[18px] px-[20px] overflow-x-auto whitespace-pre"
    ><span class="text-[var(--purple)]">export async function</span> <span class="text-[var(--pink)]">generateKeyPair</span>(): <span class="text-sky-300">Promise</span>&lt;<span class="text-sky-300">CryptoKeyPair</span>&gt; {
    <span class="text-white/40 italic">/* … ECDH P-256 keypair generation … */</span>
}

<span class="text-[var(--purple)]">export async function</span> <span class="text-[var(--pink)]">exportPublicKey</span>(key: <span class="text-sky-300">CryptoKey</span>): <span class="text-sky-300">Promise</span>&lt;<span class="text-sky-300">string</span>&gt; {
    <span class="text-white/40 italic">/* … public key export … */</span>
}

<span class="text-[var(--purple)]">export async function</span> <span class="text-[var(--pink)]">importPublicKey</span>(base64: <span class="text-sky-300">string</span>): <span class="text-sky-300">Promise</span>&lt;<span class="text-sky-300">CryptoKey</span>&gt; {
    <span class="text-white/40 italic">/* … public key import … */</span>
}

<span class="text-[var(--purple)]">export async function</span> <span class="text-[var(--pink)]">deriveSharedKey</span>(
    privateKey: <span class="text-sky-300">CryptoKey</span>,
    remotePubKey: <span class="text-sky-300">CryptoKey</span>,
): <span class="text-sky-300">Promise</span>&lt;<span class="text-sky-300">CryptoKey</span>&gt; {
    <span class="text-white/40 italic">/* … ECDH → AES-GCM key derivation … */</span>
}

<span class="text-[var(--purple)]">export async function</span> <span class="text-[var(--pink)]">encryptSignal</span>(
    key: <span class="text-sky-300">CryptoKey</span>,
    data: <span class="text-sky-300">unknown</span>,
): <span class="text-sky-300">Promise</span>&lt;{ iv: <span class="text-sky-300">string</span>; ciphertext: <span class="text-sky-300">string</span> }&gt; {
    <span class="text-white/40 italic">/* … AES-GCM seal (iv + ciphertext) … */</span>
}

<span class="text-[var(--purple)]">export async function</span> <span class="text-[var(--pink)]">decryptSignal</span>(
    key: <span class="text-sky-300">CryptoKey</span>,
    encrypted: { iv: <span class="text-sky-300">string</span>; ciphertext: <span class="text-sky-300">string</span> },
): <span class="text-sky-300">Promise</span>&lt;<span class="text-sky-300">unknown</span>&gt; {
    <span class="text-white/40 italic">/* … AES-GCM open … */</span>
}</pre>
</template>
