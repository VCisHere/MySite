# 图论

## 图的基本概念

### 图的定义

$[u,v]$表示$u$、$v$结点相关联，有向边表示为$\langle V, E\rangle$，无向边表示为$\{u,v\}$。

按边是否有方向，可将图分为**无向图**、**有向图**和**混合图。**

设$G$是一个有向图，如果将$G$中每条边的方向去掉就能得到一个无向图$G'$，则称$G'$为$G$的**底图**。

关联于同一条边的两个结点被称为**邻接点。**

关联于一个结点的两条边被称为**邻接边**。

不与任何结点邻接的结点被成为**孤立结点。**

仅由若干个孤立结点组成的图称为**零图**，而仅由单个孤立结点组成的图称为**平凡图**。

设边$e_{1}=e_{2}=[u,v]$（或$e_{1}=e_{2}=[u,v]$），若$e_{1}$与$e_{2}$是两条不同的边，则称$e_{1}$与$e_{2}$是**平行边**。

若存在边$e=[u, u]$，则称$e$为结点$u$上的**自回路**或**环。**

含有平行边的图称为**多重图**，不含平行边的图称为**线图**，不含自回路的线图称为**简单图**。



### 结点的度数

在图$G = \langle V, E\rangle$中，$v \in V$，与结点v关联的边数称为结点$v$的度数，记为$deg(v)$。

若$G$是有向图，则以结点v为终点的边数称为该结点的入度，记为$deg^-(v)$，以结点$v$为始点的边数称为该结点的出度，记为$deg^+(v)$。

$deg(v) = deg^-(v) + deg^+(v)$

**握手定理**

> 在任何图$G = \langle V, E\rangle$中，所有结点的度数之和等于边数的两倍。

**推论**

> 任何图中，奇数度的结点必为偶数个。

**定理**

> 在任何有向图$G = \langle V, E\rangle$中，所有结点的入度之和等于所有结点的出度之和。



### 特殊图

无向简单图$G=\langle V, E\rangle$中，如果任何两个不同结点间都恰有一条边相连，则称该图为**无向完全图**

n个结点的无向完全图记为**Kn**。

若有向图$G = \langle V, E\rangle$满足$E = V \times V$，则称G为**有向完全图**。

n个结点的有向完全图记为**Dn**。

设$G = \langle V, E\rangle$是无向图，且G是非零图，若结点集合$V$可以划分成两个不相交的子集$X$和$Y$，使得$G$中的每一条边的一个端点在$X$中而另一个端点在$Y$中，则称$G$为**二部图**，记为$G = \langle X, E, Y\rangle$。

二部图必无自回路，但可以有平行边。

设$G = \langle X,E,Y\rangle$是一个二部图，若G是一个简单图，并且X中的每个结点与Y中的每个结点均邻接，则称$G$为完全二部图。

如果$|X|=m$，$|Y|=n$，则在同构的意义上，这样的完全二部图只有一个，记为$K_{m,n}$。

二部图的判断方法：

首先给任意一个结点标上A，与标记为A的结点邻接的结点标上B，再将标记为B的结点邻接的结点标上A，如此重复下去，如果这个过程可以玩程，使得没有相邻的结点标上相同的字母，则该图是二部图，否则，它就不是二部图。



### 子图与补图

设图$G = \langle V, E\rangle$，$G'=\langle V,E\rangle$，若有$E' \subseteq E$且$V' \subseteq V$，则称G'为G的**子图**。

设$G'$是$G$的子图：

若$V' = V$，则称$G'$是$G$的**生成子图**。

若$V'$仅由$E'$中边相关联的结点组成，则称$G'$为**由边集$E'$导出的子图**。

若对于$V'$中的任意结点偶对$[u, v]$，$[u, v] \in E$当且仅当$[u, v] \in E'$，则称$G'$为**由结点集$V'$导出的子图**。

给定一个图$G$，由$G$中所有的结点及所有能使$G$称为完全图的添加边组成的图，称为$G$相对于完全图的补图，记为 $\overline{\text{G}}$。

