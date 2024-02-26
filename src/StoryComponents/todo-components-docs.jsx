/*
// ===== Less Common Tags ===== //


TODO:
<h1>, <h2>, <h3>, <h4>
A heading within the text. <h1> is the largest heading, <h4> the smallest. Only used within the rule files (QuickRules.xml and Rules.xml), though it could (theoretically) be used within a section.


TODO:
<include item attributes>
<exclude item attributes [reason="S"]>
Limit an item cache to allow only certain item types. One or more of these tags can be used within an <itemcache> tag. If no <include> tag is present, it will allow all items not specifically excluded; otherwise an item must match an <include> tag and not match an <exclude> tag.

item attributes – The type of item that can/cannot be left in this cache.

reason – The reason that an item can't be left at this cache; this will be displayed if the player attempts to move a matching excluded item into the cache.

*/