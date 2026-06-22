<script setup lang="ts"></script>
<template>
    <pre
        class="font-mono text-[13px] leading-[1.7] text-white/86 bg-black/45 border border-white/8 rounded-[8px] py-[18px] px-[20px] overflow-x-auto whitespace-pre"
    ><span class="text-sky-300">Broadcast</span>::<span class="text-[var(--pink)]">channel</span>(<span class="text-emerald-300">'conversation.{conversationId}'</span>, <span class="text-[var(--purple)]">function</span> ($user, <span class="text-[var(--purple)]">int</span> $conversationId) {
    <span class="text-[var(--purple)]">return</span> <span class="text-sky-300">ConversationParticipant</span>::<span class="text-[var(--pink)]">where</span>(<span class="text-emerald-300">'conversation_id'</span>, $conversationId)
        -&gt;<span class="text-[var(--pink)]">where</span>(<span class="text-emerald-300">'user_id'</span>, $user-&gt;id)
        -&gt;<span class="text-[var(--pink)]">exists</span>();
});</pre>
</template>
