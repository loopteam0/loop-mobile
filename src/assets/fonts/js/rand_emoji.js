var emojis = [
    '😆', '😕', '😔', '😒', '😟', '🧐', '🤧', '🙃', '🤕', '🙄', '😲', '😶', '😱',
    '😵', '😴', '😩', '😧', '🤐', '🤖', '🤡', '🤠', '🕺', '😪'
]

module.exports = (() => {
    return emojis[Math.floor(Math.random() * emojis.length)]
})